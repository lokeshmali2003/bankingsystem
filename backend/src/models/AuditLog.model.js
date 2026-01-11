/**
 * Audit Log Model
 * 
 * Tracks all important actions in the system for compliance and security.
 * Records user actions, admin actions, and system events.
 */

import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: [true, 'Action is required'],
      enum: [
        'login',
        'logout',
        'transaction_create',
        'transaction_update',
        'account_create',
        'account_update',
        'loan_approve',
        'loan_reject',
        'user_create',
        'user_update',
        'user_delete',
        'password_change',
        'beneficiary_add',
        'beneficiary_remove',
        'admin_action',
      ],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      index: true,
    },
    entityType: {
      type: String,
      enum: ['user', 'account', 'transaction', 'loan', 'beneficiary', 'admin'],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    description: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    changes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: ['success', 'failure'],
      default: 'success',
    },
    errorMessage: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
auditLogSchema.index({ user: 1, createdAt: -1 });
auditLogSchema.index({ admin: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ createdAt: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;

