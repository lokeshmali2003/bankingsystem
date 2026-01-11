/**
 * Email Service
 * 
 * Handles sending emails using Nodemailer.
 * Supports transactional emails, notifications, and OTPs.
 */

import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    logger.error('Email transporter configuration error:', error);
  } else {
    logger.info('✅ Email server is ready to send messages');
  }
});

/**
 * Send Email
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.message - Email message (HTML)
 */
export const sendEmail = async ({ email, subject, message }) => {
  try {
    const mailOptions = {
      from: `"Banking System" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject,
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${email}: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email to ${email}:`, error);
    throw new Error('Failed to send email');
  }
};

/**
 * Send Transaction Notification Email
 */
export const sendTransactionEmail = async (user, transaction) => {
  const message = `
    <h2>Transaction Alert</h2>
    <p>Dear ${user.firstName},</p>
    <p>A ${transaction.transactionType} transaction has been processed:</p>
    <ul>
      <li>Amount: ${transaction.currency} ${transaction.amount}</li>
      <li>Transaction ID: ${transaction.transactionId}</li>
      <li>Status: ${transaction.status}</li>
      <li>Date: ${new Date(transaction.createdAt).toLocaleString()}</li>
    </ul>
    <p>If you didn't make this transaction, please contact us immediately.</p>
  `;

  return sendEmail({
    email: user.email,
    subject: 'Transaction Alert',
    message,
  });
};

/**
 * Send Loan Approval Email
 */
export const sendLoanApprovalEmail = async (user, loan) => {
  const message = `
    <h2>Loan Approved</h2>
    <p>Dear ${user.firstName},</p>
    <p>Congratulations! Your loan application has been approved.</p>
    <ul>
      <li>Loan Number: ${loan.loanNumber}</li>
      <li>Amount: $${loan.principalAmount}</li>
      <li>Interest Rate: ${loan.interestRate}%</li>
      <li>Tenure: ${loan.tenureMonths} months</li>
      <li>EMI: $${loan.emiAmount}</li>
    </ul>
  `;

  return sendEmail({
    email: user.email,
    subject: 'Loan Approved',
    message,
  });
};

