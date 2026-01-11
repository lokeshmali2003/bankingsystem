/**
 * Loan Model
 * 
 * Represents loan applications and loans granted to users.
 * Tracks loan status, payments, and interest calculations.
 */

import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema(
  {
    loanNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Loan must belong to a user'],
      index: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: [true, 'Loan must be linked to an account'],
    },
    loanType: {
      type: String,
      enum: ['personal', 'home', 'car', 'education', 'business'],
      required: [true, 'Loan type is required'],
    },
    principalAmount: {
      type: Number,
      required: [true, 'Principal amount is required'],
      min: [1000, 'Minimum loan amount is 1000'],
    },
    interestRate: {
      type: Number,
      required: [true, 'Interest rate is required'],
      min: [0, 'Interest rate cannot be negative'],
      max: [30, 'Interest rate cannot exceed 30%'],
    },
    tenureMonths: {
      type: Number,
      required: [true, 'Tenure is required'],
      min: [1, 'Tenure must be at least 1 month'],
      max: [360, 'Tenure cannot exceed 360 months'],
    },
    emiAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'disbursed', 'active', 'closed', 'defaulted'],
      default: 'pending',
    },
    disbursedAmount: {
      type: Number,
      default: 0,
    },
    disbursedDate: Date,
    startDate: Date,
    endDate: Date,
    nextPaymentDate: Date,
    totalPaid: {
      type: Number,
      default: 0,
    },
    remainingBalance: {
      type: Number,
      required: true,
    },
    numberOfPayments: {
      type: Number,
      default: 0,
    },
    documents: [{
      type: {
        type: String,
        enum: ['identity', 'income', 'property', 'other'],
      },
      url: String,
      uploadedAt: Date,
    }],
    rejectionReason: String,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    approvedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
loanSchema.index({ user: 1, status: 1 });
loanSchema.index({ loanNumber: 1 });
loanSchema.index({ status: 1 });

// Virtual for loan progress
loanSchema.virtual('progress').get(function () {
  if (this.totalAmount === 0) return 0;
  return ((this.totalAmount - this.remainingBalance) / this.totalAmount) * 100;
});

// Virtual for days until next payment
loanSchema.virtual('daysUntilNextPayment').get(function () {
  if (!this.nextPaymentDate) return null;
  const days = Math.ceil((this.nextPaymentDate - Date.now()) / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
});

// Static method to generate loan number
loanSchema.statics.generateLoanNumber = function () {
  const prefix = 'LN';
  const timestamp = Date.now();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${timestamp}${random}`;
};

// Method to calculate EMI
loanSchema.methods.calculateEMI = function () {
  const monthlyRate = this.interestRate / (12 * 100);
  const emi = (this.principalAmount * monthlyRate * Math.pow(1 + monthlyRate, this.tenureMonths)) /
              (Math.pow(1 + monthlyRate, this.tenureMonths) - 1);
  return Math.round(emi * 100) / 100;
};

// Pre-save hook to calculate EMI and total amount
loanSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('principalAmount') || this.isModified('interestRate') || this.isModified('tenureMonths')) {
    this.emiAmount = this.calculateEMI();
    this.totalAmount = this.emiAmount * this.tenureMonths;
    this.remainingBalance = this.totalAmount;
  }
  next();
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;

