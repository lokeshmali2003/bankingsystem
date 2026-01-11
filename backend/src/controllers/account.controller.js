/**
 * Account Controller
 * 
 * Handles account-related operations: create, get, update accounts.
 */

import Account from '../models/Account.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * @route   POST /api/accounts
 * @desc    Create a new account
 * @access  Private
 */
export const createAccount = asyncHandler(async (req, res) => {
  const { accountType, initialDeposit = 0 } = req.body;
  const userId = req.user._id;

  // Generate unique account number
  let accountNumber;
  let isUnique = false;
  while (!isUnique) {
    accountNumber = Account.generateAccountNumber();
    const existing = await Account.findOne({ accountNumber });
    if (!existing) isUnique = true;
  }

  // Create account
  const account = await Account.create({
    accountNumber,
    user: userId,
    accountType,
    balance: initialDeposit,
  });

  // Create audit log
  await AuditLog.create({
    action: 'account_create',
    user: userId,
    entityType: 'account',
    entityId: account._id,
    description: `Created ${accountType} account`,
    status: 'success',
  });

  res.status(201).json(
    new ApiResponse(201, { account }, 'Account created successfully')
  );
});

/**
 * @route   GET /api/accounts
 * @desc    Get user's accounts
 * @access  Private
 */
export const getAccounts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const accounts = await Account.find({ user: userId, status: { $ne: 'closed' } })
    .sort({ createdAt: -1 });

  res.json(
    new ApiResponse(200, { accounts }, 'Accounts retrieved successfully')
  );
});

/**
 * @route   GET /api/accounts/:id
 * @desc    Get account by ID
 * @access  Private
 */
export const getAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const account = await Account.findOne({ _id: id, user: userId });

  if (!account) {
    throw new ApiError(404, 'Account not found');
  }

  res.json(
    new ApiResponse(200, { account }, 'Account retrieved successfully')
  );
});

/**
 * @route   PUT /api/accounts/:id
 * @desc    Update account
 * @access  Private
 */
export const updateAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const updates = req.body;

  const account = await Account.findOne({ _id: id, user: userId });

  if (!account) {
    throw new ApiError(404, 'Account not found');
  }

  // Don't allow updating certain fields
  delete updates.accountNumber;
  delete updates.user;
  delete updates.balance;

  Object.assign(account, updates);
  await account.save();

  // Create audit log
  await AuditLog.create({
    action: 'account_update',
    user: userId,
    entityType: 'account',
    entityId: account._id,
    description: 'Account updated',
    status: 'success',
  });

  res.json(
    new ApiResponse(200, { account }, 'Account updated successfully')
  );
});

/**
 * @route   DELETE /api/accounts/:id
 * @desc    Close account
 * @access  Private
 */
export const closeAccount = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const account = await Account.findOne({ _id: id, user: userId });

  if (!account) {
    throw new ApiError(404, 'Account not found');
  }

  if (account.balance > 0) {
    throw new ApiError(400, 'Cannot close account with balance. Please withdraw all funds first.');
  }

  account.status = 'closed';
  account.closedDate = new Date();
  await account.save();

  // Create audit log
  await AuditLog.create({
    action: 'account_update',
    user: userId,
    entityType: 'account',
    entityId: account._id,
    description: 'Account closed',
    status: 'success',
  });

  res.json(
    new ApiResponse(200, { account }, 'Account closed successfully')
  );
});

