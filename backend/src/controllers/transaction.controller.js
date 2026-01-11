/**
 * Transaction Controller
 * 
 * Handles transaction operations: transfer, deposit, withdrawal,
 * get transaction history, generate statements.
 */

import { createTransaction, getUserTransactions } from '../services/transaction.service.js';
import { generateAccountStatement } from '../services/pdf.service.js';
import Account from '../models/Account.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @route   POST /api/transactions/transfer
 * @desc    Transfer funds between accounts
 * @access  Private
 */
export const transfer = asyncHandler(async (req, res) => {
  const { fromAccount, toAccount, amount, description } = req.body;
  const userId = req.user._id;

  // Verify accounts belong to user (for fromAccount)
  const fromAccountDoc = await Account.findById(fromAccount);
  if (!fromAccountDoc || fromAccountDoc.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not have access to this account');
  }

  const transaction = await createTransaction({
    fromAccount,
    toAccount,
    user: userId,
    transactionType: 'transfer',
    amount,
    description,
  });

  res.status(201).json(
    new ApiResponse(201, { transaction }, 'Transfer completed successfully')
  );
});

/**
 * @route   POST /api/transactions/deposit
 * @desc    Deposit funds to account
 * @access  Private
 */
export const deposit = asyncHandler(async (req, res) => {
  const { toAccount, amount, description } = req.body;
  const userId = req.user._id;

  // Verify account belongs to user
  const account = await Account.findById(toAccount);
  if (!account || account.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not have access to this account');
  }

  const transaction = await createTransaction({
    toAccount,
    user: userId,
    transactionType: 'deposit',
    amount,
    description,
  });

  res.status(201).json(
    new ApiResponse(201, { transaction }, 'Deposit completed successfully')
  );
});

/**
 * @route   POST /api/transactions/withdraw
 * @desc    Withdraw funds from account
 * @access  Private
 */
export const withdraw = asyncHandler(async (req, res) => {
  const { fromAccount, amount, description } = req.body;
  const userId = req.user._id;

  // Verify account belongs to user
  const account = await Account.findById(fromAccount);
  if (!account || account.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not have access to this account');
  }

  const transaction = await createTransaction({
    fromAccount,
    user: userId,
    transactionType: 'withdrawal',
    amount,
    description,
  });

  res.status(201).json(
    new ApiResponse(201, { transaction }, 'Withdrawal completed successfully')
  );
});

/**
 * @route   GET /api/transactions
 * @desc    Get user's transaction history
 * @access  Private
 */
export const getTransactions = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const filters = {
    page: req.query.page || 1,
    limit: req.query.limit || 10,
    transactionType: req.query.type,
    status: req.query.status,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  };

  const result = await getUserTransactions(userId, filters);

  res.json(
    new ApiResponse(200, result, 'Transactions retrieved successfully')
  );
});

/**
 * @route   GET /api/transactions/statement/:accountId
 * @desc    Generate account statement PDF
 * @access  Private
 */
export const generateStatement = asyncHandler(async (req, res) => {
  const { accountId } = req.params;
  const userId = req.user._id;
  const { startDate, endDate } = req.query;

  // Verify account belongs to user
  const account = await Account.findById(accountId);
  if (!account || account.user.toString() !== userId.toString()) {
    throw new ApiError(403, 'You do not have access to this account');
  }

  // Get transactions
  const filters = {
    startDate: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days default
    endDate: endDate || new Date(),
  };

  const { transactions } = await getUserTransactions(userId, {
    ...filters,
    limit: 1000, // Get all transactions for statement
  });

  // Filter transactions for this account
  const accountTransactions = transactions.filter(
    (t) => t.fromAccount?._id.toString() === accountId || t.toAccount?._id.toString() === accountId
  );

  // Generate PDF
  const filepath = await generateAccountStatement(
    account,
    accountTransactions,
    new Date(filters.startDate),
    new Date(filters.endDate)
  );

  res.download(filepath, `statement_${account.accountNumber}.pdf`, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
    }
    // Clean up file after download
    // fs.unlinkSync(filepath);
  });
});

