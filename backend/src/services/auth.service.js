/**
 * Authentication Service
 * 
 * Handles JWT token generation, email verification, OTP generation,
 * and password reset functionality.
 */

import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import otpGenerator from 'otp-generator';
import User from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { sendEmail } from './email.service.js';

/**
 * Generate JWT Access Token
 */
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Generate JWT Refresh Token
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d',
  });
};

/**
 * Generate Email Verification Token
 */
export const generateEmailVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

/**
 * Generate OTP
 */
export const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};

/**
 * Send Email Verification
 */
export const sendEmailVerification = async (user) => {
  const token = generateEmailVerificationToken();
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  user.emailVerificationToken = token;
  user.emailVerificationExpires = expires;
  await user.save({ validateBeforeSave: false });

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
  
  const message = `
    <h2>Verify Your Email</h2>
    <p>Please click the link below to verify your email address:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
    <p>This link will expire in 24 hours.</p>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Email Verification',
    message,
  });

  return token;
};

/**
 * Send OTP for Phone Verification
 */
export const sendOTP = async (phone) => {
  const otp = generateOTP();
  // In production, integrate with SMS service (Twilio, AWS SNS, etc.)
  // For now, we'll just return the OTP (in production, don't return it)
  console.log(`OTP for ${phone}: ${otp}`);
  
  // Store OTP in cache/database with expiration
  // For now, return it (in production, use Redis or similar)
  return otp;
};

/**
 * Send Password Reset Email
 */
export const sendPasswordResetEmail = async (user) => {
  const token = generateEmailVerificationToken();
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

  user.passwordResetToken = token;
  user.passwordResetExpires = expires;
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
  
  const message = `
    <h2>Reset Your Password</h2>
    <p>Please click the link below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link will expire in 10 minutes.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    message,
  });

  return token;
};

