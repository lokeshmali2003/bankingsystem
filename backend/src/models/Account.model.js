/**
 * Account Model
 * 
 * Represents a bank account (Savings, Checking, etc.)
 * Linked to a user and contains balance information.
 */

import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Account must belong to a user'],
      index: true,
    },
    accountType: {
      type: String,
      enum: ['savings', 'checking', 'current'],
      required: [true, 'Account type is required'],
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Balance cannot be negative'],
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'frozen', 'closed'],
      default: 'active',
    },
    interestRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    minimumBalance: {
      type: Number,
      default: 0,
    },
    openedDate: {
      type: Date,
      default: Date.now,
    },
    closedDate: Date,
    lastTransactionDate: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
accountSchema.index({ accountNumber: 1 });
accountSchema.index({ user: 1, accountType: 1 });

// Virtual for account display name
accountSchema.virtual('displayName').get(function () {
  return `${this.accountType.toUpperCase()} - ${this.accountNumber.slice(-4)}`;
});

// Method to check if account can perform transaction
accountSchema.methods.canTransact = function (amount) {
  if (this.status !== 'active') {
    return { canTransact: false, reason: 'Account is not active' };
  }
  
  if (this.balance - amount < this.minimumBalance) {
    return { 
      canTransact: false, 
      reason: 'Insufficient balance or below minimum balance requirement' 
    };
  }
  
  return { canTransact: true };
};

// Static method to generate account number
accountSchema.statics.generateAccountNumber = function () {
  const prefix = '10'; // Bank prefix
  const random = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${prefix}${random}`;
};

const Account = mongoose.model('Account', accountSchema);

export default Account;

