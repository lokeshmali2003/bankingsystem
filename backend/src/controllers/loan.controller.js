/**
 * Loan Controller
 * 
 * Handles loan operations: apply, get loans, make payments.
 */

import Loan from '../models/Loan.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Account from '../models/Account.model.js';
import { createTransaction } from '../services/transaction.service.js';
import { sendLoanApprovalEmail } from '../services/email.service.js';
import User from '../models/User.model.js';

/**
 * @route   POST /api/loans
 * @desc    Apply for a loan
 * @access  Private
 */
export const applyForLoan = asyncHandler(async (req, res) => {
  const { loanType, principalAmount, interestRate, tenureMonths, account } = req.body;
  const userId = req.user._id;

  // Verify account belongs to user
  const accountDoc = await Account.findById(account);
  if (!accountDoc || accountDoc.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not have access to this account');
  }

  // Generate loan number
  let loanNumber;
  let isUnique = false;
  while (!isUnique) {
    loanNumber = Loan.generateLoanNumber();
    const existing = await Loan.findOne({ loanNumber });
    if (!existing) isUnique = true;
  }

  // Create loan application
  const loan = await Loan.create({
    loanNumber,
    user: userId,
    account,
    loanType,
    principalAmount,
    interestRate,
    tenureMonths,
    remainingBalance: principalAmount * (1 + interestRate / 100), // Will be recalculated in pre-save
  });

  res.status(201).json(
    new ApiResponse(201, { loan }, 'Loan application submitted successfully')
  );
});

/**
 * @route   GET /api/loans
 * @desc    Get user's loans
 * @access  Private
 */
export const getLoans = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { status } = req.query;

  const query = { user: userId };
  if (status) query.status = status;

  const loans = await Loan.find(query)
    .populate('account', 'accountNumber accountType')
    .sort({ createdAt: -1 });

  res.json(
    new ApiResponse(200, { loans }, 'Loans retrieved successfully')
  );
});

/**
 * @route   GET /api/loans/:id
 * @desc    Get loan by ID
 * @access  Private
 */
export const getLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const loan = await Loan.findOne({ _id: id, user: userId })
    .populate('account', 'accountNumber accountType');

  if (!loan) {
    throw new ApiError(404, 'Loan not found');
  }

  res.json(
    new ApiResponse(200, { loan }, 'Loan retrieved successfully')
  );
});

/**
 * @route   POST /api/loans/:id/pay
 * @desc    Make loan payment
 * @access  Private
 */
export const payLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { account, amount } = req.body;
  const userId = req.user._id;

  const loan = await Loan.findOne({ _id: id, user: userId });
  if (!loan) {
    throw new ApiError(404, 'Loan not found');
  }

  if (loan.status !== 'active' && loan.status !== 'disbursed') {
    throw new ApiError(400, 'Loan is not active');
  }

  if (amount > loan.remainingBalance) {
    throw new ApiError(400, 'Payment amount exceeds remaining balance');
  }

  // Verify account belongs to user
  const accountDoc = await Account.findById(account);
  if (!accountDoc || accountDoc.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not have access to this account');
  }

  // Create transaction
  await createTransaction({
    fromAccount: account,
    user: userId,
    transactionType: 'loan_payment',
    amount,
    description: `Loan payment for ${loan.loanNumber}`,
  });

  // Update loan
  loan.totalPaid += amount;
  loan.remainingBalance -= amount;
  loan.numberOfPayments += 1;

  if (loan.remainingBalance <= 0) {
    loan.status = 'closed';
    loan.remainingBalance = 0;
  } else {
    // Calculate next payment date (30 days from now)
    loan.nextPaymentDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }

  await loan.save();

  res.json(
    new ApiResponse(200, { loan }, 'Loan payment processed successfully')
  );
});

