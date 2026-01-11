/**
 * Admin Routes
 */

import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  getPendingLoans,
  approveLoan,
  rejectLoan,
  getDashboardStats,
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.get('/loans/pending', getPendingLoans);
router.put('/loans/:id/approve', approveLoan);
router.put('/loans/:id/reject', rejectLoan);

export default router;

