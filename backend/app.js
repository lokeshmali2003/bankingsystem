/**
 * Banking System - Express Application Setup
 * 
 * This file configures the Express application with all middleware,
 * routes, and error handling. It follows clean architecture principles.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import logger from './src/utils/logger.js';

// Import routes
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import accountRoutes from './src/routes/account.routes.js';
import transactionRoutes from './src/routes/transaction.routes.js';
import loanRoutes from './src/routes/loan.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import beneficiaryRoutes from './src/routes/beneficiary.routes.js';

// Import error handlers
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import { notFound } from './src/middlewares/notFound.middleware.js';

// Note: dotenv.config() is called in server.js before this file is imported

const app = express();

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(mongoSanitize()); // Prevents NoSQL injection attacks

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting (disabled in development, enabled in production)
if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use('/api/', limiter);
} else {
  // Very lenient rate limiting for development
  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10000, // 10000 requests per minute in development (effectively unlimited)
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting for localhost in development
      return req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1';
    },
  });
  app.use('/api/', limiter);
}

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request Logging Middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/beneficiaries', beneficiaryRoutes);

// 404 Handler
app.use(notFound);

// Error Handler (must be last)
app.use(errorHandler);

export default app;

