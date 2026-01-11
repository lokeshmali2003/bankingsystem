/**
 * Transaction Model
 * 
 * Represents all financial transactions (deposits, withdrawals, transfers).
 * Maintains complete audit trail of all account movements.
 */

import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: function() {
        return this.transactionType !== 'deposit';
      },
    },
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: function() {
        return this.transactionType !== 'withdrawal';
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    transactionType: {
      type: String,
      enum: ['deposit', 'withdrawal', 'transfer', 'loan_payment', 'interest'],
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled'],
      default: 'pending',
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    referenceNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    balanceAfter: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      default: 0,
      min: 0,
    },
    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    processedAt: Date,
    failureReason: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for efficient queries
transactionSchema.index({ user: 1, createdAt: -1 });
transactionSchema.index({ fromAccount: 1, createdAt: -1 });
transactionSchema.index({ toAccount: 1, createdAt: -1 });
transactionSchema.index({ transactionType: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ transactionId: 1 });

// Virtual for transaction display
transactionSchema.virtual('displayType').get(function () {
  return this.transactionType.replace('_', ' ').toUpperCase();
});

// Static method to generate transaction ID
transactionSchema.statics.generateTransactionId = function () {
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TXN${timestamp}${random}`;
};

// Static method to generate reference number
transactionSchema.statics.generateReferenceNumber = function () {
  const timestamp = Date.now();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `REF${timestamp}${random}`;
};

// Pre-save hook to set processedAt
transactionSchema.pre('save', function (next) {
  if (this.status === 'completed' && !this.processedAt) {
    this.processedAt = new Date();
  }
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;

