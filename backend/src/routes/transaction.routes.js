/**
 * Transaction Routes
 */

import express from 'express';
import {
  transfer,
  deposit,
  withdraw,
  getTransactions,
  generateStatement,
} from '../controllers/transaction.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  transferValidation,
  depositValidation,
  withdrawalValidation,
} from '../validations/transaction.validation.js';
import { validate } from '../utils/validate.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post('/transfer', validate(transferValidation), transfer);
router.post('/deposit', validate(depositValidation), deposit);
router.post('/withdraw', validate(withdrawalValidation), withdraw);
router.get('/', getTransactions);
router.get('/statement/:accountId', generateStatement);

export default router;

