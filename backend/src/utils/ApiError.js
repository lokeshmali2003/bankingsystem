/**
 * Custom API Error Class
 * 
 * Extends Error class to create custom API errors with status codes.
 * Used throughout the application for consistent error handling.
 */

export class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

