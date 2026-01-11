/**
 * 404 Not Found Middleware
 * 
 * Handles requests to routes that don't exist
 */

import { ApiError } from '../utils/ApiError.js';

export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Route ${req.originalUrl} not found`);
  next(error);
};

