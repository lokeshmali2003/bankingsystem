/**
 * Async Handler Utility
 * 
 * Wraps async route handlers to automatically catch errors
 * and pass them to the error handling middleware.
 * Eliminates the need for try-catch blocks in every route handler.
 */

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

