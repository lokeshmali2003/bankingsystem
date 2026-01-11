/**
 * Account Routes
 */

import express from 'express';
import {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  closeAccount,
} from '../controllers/account.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.route('/')
  .post(createAccount)
  .get(getAccounts);

router.route('/:id')
  .get(getAccount)
  .put(updateAccount)
  .delete(closeAccount);

export default router;

