/**
 * Transaction Service
 * 
 * Handles business logic for transactions including deposits,
 * withdrawals, transfers, and balance updates.
 */

import Transaction from '../models/Transaction.model.js';
import Account from '../models/Account.model.js';
import User from '../models/User.model.js';
import Notification from '../models/Notification.model.js';
import AuditLog from '../models/AuditLog.model.js';
import { ApiError } from '../utils/ApiError.js';
import { sendTransactionEmail } from './email.service.js';

/**
 * Create a transaction
 */
export const createTransaction = async (transactionData) => {
  const session = await Transaction.startSession();
  session.startTransaction();

  try {
    const { fromAccount, toAccount, user, transactionType, amount, description } = transactionData;

    // Generate transaction ID
    const transactionId = Transaction.generateTransactionId();
    const referenceNumber = Transaction.generateReferenceNumber();

    // Handle different transaction types
    let balanceAfter = 0;
    let fromAccountDoc = null;
    let toAccountDoc = null;

    if (transactionType === 'deposit') {
      // Deposit: Add money to account
      toAccountDoc = await Account.findById(toAccount).session(session);
      if (!toAccountDoc) {
        throw new ApiError(404, 'Account not found');
      }

      const canTransact = toAccountDoc.canTransact(-amount);
      if (!canTransact.canTransact && transactionType !== 'deposit') {
        throw new ApiError(400, canTransact.reason);
      }

      toAccountDoc.balance += amount;
      balanceAfter = toAccountDoc.balance;
      await toAccountDoc.save({ session });

    } else if (transactionType === 'withdrawal') {
      // Withdrawal: Remove money from account
      fromAccountDoc = await Account.findById(fromAccount).session(session);
      if (!fromAccountDoc) {
        throw new ApiError(404, 'Account not found');
      }

      const canTransact = fromAccountDoc.canTransact(amount);
      if (!canTransact.canTransact) {
        throw new ApiError(400, canTransact.reason);
      }

      fromAccountDoc.balance -= amount;
      balanceAfter = fromAccountDoc.balance;
      fromAccountDoc.lastTransactionDate = new Date();
      await fromAccountDoc.save({ session });

    } else if (transactionType === 'transfer') {
      // Transfer: Move money between accounts
      fromAccountDoc = await Account.findById(fromAccount).session(session);
      toAccountDoc = await Account.findById(toAccount).session(session);

      if (!fromAccountDoc || !toAccountDoc) {
        throw new ApiError(404, 'One or both accounts not found');
      }

      if (fromAccountDoc._id.toString() === toAccountDoc._id.toString()) {
        throw new ApiError(400, 'Cannot transfer to the same account');
      }

      const canTransact = fromAccountDoc.canTransact(amount);
      if (!canTransact.canTransact) {
        throw new ApiError(400, canTransact.reason);
      }

      // Deduct from source account
      fromAccountDoc.balance -= amount;
      fromAccountDoc.lastTransactionDate = new Date();
      await fromAccountDoc.save({ session });

      // Add to destination account
      toAccountDoc.balance += amount;
      toAccountDoc.lastTransactionDate = new Date();
      await toAccountDoc.save({ session });

      balanceAfter = fromAccountDoc.balance;
    }

    // Create transaction record
    const transaction = await Transaction.create([{
      transactionId,
      referenceNumber,
      fromAccount,
      toAccount,
      user,
      transactionType,
      amount,
      description,
      balanceAfter,
      status: 'completed',
      processedAt: new Date(),
    }], { session });

    await session.commitTransaction();

    // Create notification
    const userDoc = await User.findById(user);
    await Notification.create({
      user,
      type: 'transaction',
      title: 'Transaction Completed',
      message: `${transactionType} of $${amount} has been processed`,
      link: `/transactions/${transaction[0]._id}`,
    });

    // Create audit log
    await AuditLog.create({
      action: 'transaction_create',
      user,
      entityType: 'transaction',
      entityId: transaction[0]._id,
      description: `Created ${transactionType} transaction`,
      status: 'success',
    });

    // Send email notification (async, don't wait)
    if (userDoc) {
      sendTransactionEmail(userDoc, transaction[0]).catch(err => {
        console.error('Failed to send transaction email:', err);
      });
    }

    return transaction[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * Get user transactions
 */
export const getUserTransactions = async (userId, filters = {}) => {
  const { page = 1, limit = 10, transactionType, status, startDate, endDate } = filters;

  const query = { user: userId };

  if (transactionType) query.transactionType = transactionType;
  if (status) query.status = status;
  if (startDate || endDate) {
    query.createdAt = {};
    if (startDate) query.createdAt.$gte = new Date(startDate);
    if (endDate) query.createdAt.$lte = new Date(endDate);
  }

  const transactions = await Transaction.find(query)
    .populate('fromAccount', 'accountNumber accountType')
    .populate('toAccount', 'accountNumber accountType')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Transaction.countDocuments(query);

  return {
    transactions,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

