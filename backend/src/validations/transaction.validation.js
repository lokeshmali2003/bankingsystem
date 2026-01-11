/**
 * Transaction Validation Schemas
 */

import Joi from 'joi';

/**
 * Transfer validation schema
 */
export const transferValidation = Joi.object({
  fromAccount: Joi.string().required()
    .messages({
      'string.empty': 'Source account is required',
    }),
  toAccount: Joi.string().required()
    .messages({
      'string.empty': 'Destination account is required',
    }),
  amount: Joi.number().positive().precision(2).required()
    .messages({
      'number.positive': 'Amount must be positive',
      'number.base': 'Amount must be a number',
      'any.required': 'Amount is required',
    }),
  description: Joi.string().trim().max(500).optional(),
});

/**
 * Deposit validation schema
 */
export const depositValidation = Joi.object({
  toAccount: Joi.string().required()
    .messages({
      'string.empty': 'Account is required',
    }),
  amount: Joi.number().positive().precision(2).required()
    .messages({
      'number.positive': 'Amount must be positive',
      'number.base': 'Amount must be a number',
      'any.required': 'Amount is required',
    }),
  description: Joi.string().trim().max(500).optional(),
});

/**
 * Withdrawal validation schema
 */
export const withdrawalValidation = Joi.object({
  fromAccount: Joi.string().required()
    .messages({
      'string.empty': 'Account is required',
    }),
  amount: Joi.number().positive().precision(2).required()
    .messages({
      'number.positive': 'Amount must be positive',
      'number.base': 'Amount must be a number',
      'any.required': 'Amount is required',
    }),
  description: Joi.string().trim().max(500).optional(),
});

