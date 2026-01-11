/**
 * Loan Routes
 */

import express from 'express';
import {
  applyForLoan,
  getLoans,
  getLoan,
  payLoan,
} from '../controllers/loan.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.route('/')
  .post(applyForLoan)
  .get(getLoans);

router.route('/:id')
  .get(getLoan);

router.post('/:id/pay', payLoan);

export default router;

