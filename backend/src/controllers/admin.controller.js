/**
 * Admin Controller
 * 
 * Handles admin operations: user management, loan approval, reports.
 */

import User from '../models/User.model.js';
import Loan from '../models/Loan.model.js';
import Transaction from '../models/Transaction.model.js';
import Account from '../models/Account.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendLoanApprovalEmail } from '../services/email.service.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Private (Admin only)
 */
export const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, role, isActive } = req.query;

  const query = {};
  if (search) {
    query.$or = [
      { email: { $regex: search, $options: 'i' } },
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
    ];
  }
  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === 'true';

  const users = await User.find(query)
    .select('-password -refreshToken')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.json(
    new ApiResponse(200, {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    }, 'Users retrieved successfully')
  );
});

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin only)
 */
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password -refreshToken');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  res.json(
    new ApiResponse(200, { user }, 'User retrieved successfully')
  );
});

/**
 * @route   PUT /api/admin/users/:id
 * @desc    Update user
 * @access  Private (Admin only)
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
    .select('-password -refreshToken');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Create audit log
  await AuditLog.create({
    action: 'user_update',
    admin: req.user._id,
    entityType: 'user',
    entityId: user._id,
    description: 'User updated by admin',
    status: 'success',
  });

  res.json(
    new ApiResponse(200, { user }, 'User updated successfully')
  );
});

/**
 * @route   GET /api/admin/loans/pending
 * @desc    Get pending loan applications
 * @access  Private (Admin only)
 */
export const getPendingLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({ status: 'pending' })
    .populate('user', 'firstName lastName email')
    .populate('account', 'accountNumber')
    .sort({ createdAt: -1 });

  res.json(
    new ApiResponse(200, { loans }, 'Pending loans retrieved successfully')
  );
});

/**
 * @route   PUT /api/admin/loans/:id/approve
 * @desc    Approve loan
 * @access  Private (Admin only)
 */
export const approveLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const loan = await Loan.findById(id).populate('user');

  if (!loan) {
    throw new ApiError(404, 'Loan not found');
  }

  if (loan.status !== 'pending') {
    throw new ApiError(400, 'Loan is not pending approval');
  }

  loan.status = 'approved';
  loan.approvedBy = req.user._id;
  loan.approvedAt = new Date();
  await loan.save();

  // Send approval email
  await sendLoanApprovalEmail(loan.user, loan).catch(err => {
    console.error('Failed to send loan approval email:', err);
  });

  // Create audit log
  await AuditLog.create({
    action: 'loan_approve',
    admin: req.user._id,
    entityType: 'loan',
    entityId: loan._id,
    description: `Loan ${loan.loanNumber} approved`,
    status: 'success',
  });

  res.json(
    new ApiResponse(200, { loan }, 'Loan approved successfully')
  );
});

/**
 * @route   PUT /api/admin/loans/:id/reject
 * @desc    Reject loan
 * @access  Private (Admin only)
 */
export const rejectLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const loan = await Loan.findById(id);

  if (!loan) {
    throw new ApiError(404, 'Loan not found');
  }

  if (loan.status !== 'pending') {
    throw new ApiError(400, 'Loan is not pending approval');
  }

  loan.status = 'rejected';
  loan.rejectionReason = reason;
  loan.approvedBy = req.user._id;
  loan.approvedAt = new Date();
  await loan.save();

  // Create audit log
  await AuditLog.create({
    action: 'loan_reject',
    admin: req.user._id,
    entityType: 'loan',
    entityId: loan._id,
    description: `Loan ${loan.loanNumber} rejected`,
    status: 'success',
  });

  res.json(
    new ApiResponse(200, { loan }, 'Loan rejected successfully')
  );
});

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get admin dashboard stats
 * @access  Private (Admin only)
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const totalAccounts = await Account.countDocuments();
  const totalLoans = await Loan.countDocuments();
  const pendingLoans = await Loan.countDocuments({ status: 'pending' });
  
  const totalTransactions = await Transaction.countDocuments({ status: 'completed' });
  const totalTransactionAmount = await Transaction.aggregate([
    { $match: { status: 'completed' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  const stats = {
    users: {
      total: totalUsers,
      active: activeUsers,
    },
    accounts: {
      total: totalAccounts,
    },
    loans: {
      total: totalLoans,
      pending: pendingLoans,
    },
    transactions: {
      total: totalTransactions,
      totalAmount: totalTransactionAmount[0]?.total || 0,
    },
  };

  res.json(
    new ApiResponse(200, { stats }, 'Dashboard stats retrieved successfully')
  );
});

