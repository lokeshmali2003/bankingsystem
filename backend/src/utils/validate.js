/**
 * Validation Middleware
 * 
 * Validates request data against Joi schemas.
 */

import { ApiError } from './ApiError.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      throw new ApiError(400, errors.join(', '));
    }

    // Remove confirmPassword if it exists (only needed for validation)
    if (value.confirmPassword) {
      delete value.confirmPassword;
    }

    req.body = value;
    next();
  };
};

