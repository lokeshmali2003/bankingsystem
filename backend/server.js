/**
 * Banking System - Server Entry Point
 * 
 * This file initializes the Express server and connects to MongoDB.
 * It handles graceful shutdown and sets up the application.
 */

import dotenv from 'dotenv';

// Load environment variables FIRST before any other imports
dotenv.config();

import app from './app.js';
import { connectDB } from './src/config/database.js';
import logger from './src/utils/logger.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`❌ Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('💥 Process terminated');
  });
});

