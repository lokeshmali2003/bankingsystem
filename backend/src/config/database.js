/**
 * MongoDB Database Configuration
 * 
 * Handles MongoDB connection using Mongoose with connection pooling
 * and error handling. Uses environment variables for configuration.
 */

import mongoose from 'mongoose';
import logger from '../utils/logger.js';

/**
 * Connect to MongoDB database
 * Uses connection pooling and handles reconnection logic
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection pool settings
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 5, // Minimum number of connections in the pool
      
      // Connection timeout settings
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Timeout for socket operations
      
      // Retry settings
      retryWrites: true,
      w: 'majority',
    });

    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error(`❌ MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('✅ MongoDB reconnected');
    });

  } catch (error) {
    logger.error(`❌ MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Disconnect from MongoDB
 * Used for graceful shutdown
 */
export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('✅ MongoDB disconnected');
  } catch (error) {
    logger.error(`❌ Error disconnecting MongoDB: ${error.message}`);
  }
};

