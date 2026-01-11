/**
 * API Response Utility
 * 
 * Standardized response format for all API endpoints.
 * Ensures consistent response structure across the application.
 */

export class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

