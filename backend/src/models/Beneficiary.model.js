/**
 * Beneficiary Model
 * 
 * Represents a beneficiary (payee) that a user can transfer money to.
 * Stores account details for quick transfers.
 */

import mongoose from 'mongoose';

const beneficiarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Beneficiary must belong to a user'],
      index: true,
    },
    nickname: {
      type: String,
      required: [true, 'Nickname is required'],
      trim: true,
      maxlength: [50, 'Nickname cannot exceed 50 characters'],
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required'],
    },
    accountHolderName: {
      type: String,
      required: [true, 'Account holder name is required'],
      trim: true,
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required'],
      trim: true,
    },
    ifscCode: {
      type: String,
      required: [true, 'IFSC code is required'],
      uppercase: true,
      trim: true,
    },
    accountType: {
      type: String,
      enum: ['savings', 'checking', 'current'],
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastUsed: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes
beneficiarySchema.index({ user: 1, accountNumber: 1 }, { unique: true });
beneficiarySchema.index({ user: 1, isActive: 1 });

// Pre-save hook to update lastUsed
beneficiarySchema.pre('save', function (next) {
  if (this.isModified('accountNumber') && !this.isNew) {
    this.lastUsed = new Date();
  }
  next();
});

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

export default Beneficiary;

