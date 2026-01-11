/**
 * User Controller
 * 
 * Handles user profile operations.
 */

import User from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json(
    new ApiResponse(200, { user }, 'Profile retrieved successfully')
  );
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const updates = req.body;
  const userId = req.user._id;

  // Don't allow updating certain fields
  delete updates.password;
  delete updates.email;
  delete updates.role;
  delete updates.isActive;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  );

  // Create audit log
  await AuditLog.create({
    action: 'user_update',
    user: userId,
    entityType: 'user',
    entityId: userId,
    description: 'Profile updated',
    status: 'success',
  });

  res.json(
    new ApiResponse(200, { user }, 'Profile updated successfully')
  );
});

/**
 * @route   PUT /api/users/change-password
 * @desc    Change password
 * @access  Private
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId).select('+password');

  // Verify current password
  const isPasswordValid = await user.comparePassword(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Create audit log
  await AuditLog.create({
    action: 'password_change',
    user: userId,
    entityType: 'user',
    entityId: userId,
    description: 'Password changed',
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    status: 'success',
  });

  res.json(
    new ApiResponse(200, null, 'Password changed successfully')
  );
});

