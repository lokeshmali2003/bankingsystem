/**
 * Authentication Controller
 * 
 * Handles authentication-related requests: register, login, logout,
 * refresh token, email verification, password reset.
 */

import User from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  generateAccessToken,
  generateRefreshToken,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '../services/auth.service.js';
import AuditLog from '../models/AuditLog.model.js';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, password, dateOfBirth, address } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    throw new ApiError(400, 'User with this email or phone already exists');
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    dateOfBirth,
    address,
  });

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Send email verification
  await sendEmailVerification(user).catch(err => {
    console.error('Failed to send verification email:', err);
  });

  // Create audit log
  await AuditLog.create({
    action: 'user_create',
    user: user._id,
    entityType: 'user',
    entityId: user._id,
    description: 'User registered',
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    status: 'success',
  });

  res.status(201).json(
    new ApiResponse(201, {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      accessToken,
      refreshToken,
    }, 'User registered successfully. Please verify your email.')
  );
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Check if account is locked
  if (user.isLocked()) {
    throw new ApiError(423, 'Account is locked due to too many failed login attempts');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    await user.incLoginAttempts();
    throw new ApiError(401, 'Invalid email or password');
  }

  // Reset login attempts
  await user.resetLoginAttempts();

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Create audit log
  await AuditLog.create({
    action: 'login',
    user: user._id,
    entityType: 'user',
    entityId: user._id,
    description: 'User logged in',
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    status: 'success',
  });

  res.json(
    new ApiResponse(200, {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
      },
      accessToken,
      refreshToken,
    }, 'Login successful')
  );
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
  }

  // Create audit log
  await AuditLog.create({
    action: 'logout',
    user: req.user._id,
    entityType: 'user',
    entityId: req.user._id,
    description: 'User logged out',
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    status: 'success',
  });

  res.json(new ApiResponse(200, null, 'Logged out successfully'));
});

/**
 * @route   POST /api/auth/refresh-token
 * @desc    Refresh access token
 * @access  Public
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    throw new ApiError(401, 'Refresh token is required');
  }

  const user = await User.findOne({ refreshToken: token });

  if (!user) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  // Generate new tokens
  const accessToken = generateAccessToken(user._id);
  const newRefreshToken = generateRefreshToken(user._id);

  // Save new refresh token
  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  res.json(
    new ApiResponse(200, {
      accessToken,
      refreshToken: newRefreshToken,
    }, 'Token refreshed successfully')
  );
});

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify email address
 * @access  Public
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired verification token');
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  res.json(new ApiResponse(200, null, 'Email verified successfully'));
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Request password reset
 * @access  Public
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    // Don't reveal if user exists or not for security
    return res.json(
      new ApiResponse(200, null, 'If email exists, password reset link has been sent')
    );
  }

  await sendPasswordResetEmail(user);

  res.json(
    new ApiResponse(200, null, 'If email exists, password reset link has been sent')
  );
});

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password
 * @access  Public
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Create audit log
  await AuditLog.create({
    action: 'password_change',
    user: user._id,
    entityType: 'user',
    entityId: user._id,
    description: 'Password reset via email',
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
    status: 'success',
  });

  res.json(new ApiResponse(200, null, 'Password reset successfully'));
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json(
    new ApiResponse(200, {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        address: user.address,
        createdAt: user.createdAt,
      },
    }, 'User retrieved successfully')
  );
});

