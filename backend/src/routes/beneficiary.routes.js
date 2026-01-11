/**
 * Beneficiary Routes
 */

import express from 'express';
import {
  addBeneficiary,
  getBeneficiaries,
  updateBeneficiary,
  deleteBeneficiary,
} from '../controllers/beneficiary.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.route('/')
  .post(addBeneficiary)
  .get(getBeneficiaries);

router.route('/:id')
  .put(updateBeneficiary)
  .delete(deleteBeneficiary);

export default router;

