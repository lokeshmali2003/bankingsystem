/**
 * Authentication Validation Schemas
 * 
 * Uses Joi for request validation.
 * Ensures data integrity before processing.
 */

import Joi from 'joi';

/**
 * Register validation schema
 */
export const registerValidation = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required()
    .messages({
      'string.empty': 'First name is required',
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name cannot exceed 50 characters',
    }),
  lastName: Joi.string().trim().min(2).max(50).required()
    .messages({
      'string.empty': 'Last name is required',
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name cannot exceed 50 characters',
    }),
  email: Joi.string().email().lowercase().trim().required()
    .messages({
      'string.email': 'Please provide a valid email',
      'string.empty': 'Email is required',
    }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
      'string.empty': 'Phone number is required',
    }),
  password: Joi.string().min(8).required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required',
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password',
    }),
  dateOfBirth: Joi.date().max('now').required()
    .messages({
      'date.base': 'Please provide a valid date of birth',
      'date.max': 'Date of birth cannot be in the future',
    }),
  address: Joi.object({
    street: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    zipCode: Joi.string().trim().required(),
    country: Joi.string().trim().default('USA'),
  }).required(),
});

/**
 * Login validation schema
 */
export const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().trim().required()
    .messages({
      'string.email': 'Please provide a valid email',
      'string.empty': 'Email is required',
    }),
  password: Joi.string().required()
    .messages({
      'string.empty': 'Password is required',
    }),
});

/**
 * Forgot password validation schema
 */
export const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().lowercase().trim().required()
    .messages({
      'string.email': 'Please provide a valid email',
      'string.empty': 'Email is required',
    }),
});

/**
 * Reset password validation schema
 */
export const resetPasswordValidation = Joi.object({
  token: Joi.string().required()
    .messages({
      'string.empty': 'Reset token is required',
    }),
  password: Joi.string().min(8).required()
    .messages({
      'string.min': 'Password must be at least 8 characters',
      'string.empty': 'Password is required',
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Please confirm your password',
    }),
});

/**
 * Refresh token validation schema
 */
export const refreshTokenValidation = Joi.object({
  refreshToken: Joi.string().required()
    .messages({
      'string.empty': 'Refresh token is required',
    }),
});

