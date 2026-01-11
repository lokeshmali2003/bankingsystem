/**
 * Beneficiary Controller
 * 
 * Handles beneficiary operations: add, get, update, delete beneficiaries.
 */

import Beneficiary from '../models/Beneficiary.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @route   POST /api/beneficiaries
 * @desc    Add a beneficiary
 * @access  Private
 */
export const addBeneficiary = asyncHandler(async (req, res) => {
  const beneficiaryData = req.body;
  beneficiaryData.user = req.user._id;

  const beneficiary = await Beneficiary.create(beneficiaryData);

  res.status(201).json(
    new ApiResponse(201, { beneficiary }, 'Beneficiary added successfully')
  );
});

/**
 * @route   GET /api/beneficiaries
 * @desc    Get user's beneficiaries
 * @access  Private
 */
export const getBeneficiaries = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const beneficiaries = await Beneficiary.find({ user: userId, isActive: true })
    .sort({ lastUsed: -1, createdAt: -1 });

  res.json(
    new ApiResponse(200, { beneficiaries }, 'Beneficiaries retrieved successfully')
  );
});

/**
 * @route   PUT /api/beneficiaries/:id
 * @desc    Update beneficiary
 * @access  Private
 */
export const updateBeneficiary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const beneficiary = await Beneficiary.findOne({ _id: id, user: userId });

  if (!beneficiary) {
    throw new ApiError(404, 'Beneficiary not found');
  }

  Object.assign(beneficiary, req.body);
  await beneficiary.save();

  res.json(
    new ApiResponse(200, { beneficiary }, 'Beneficiary updated successfully')
  );
});

/**
 * @route   DELETE /api/beneficiaries/:id
 * @desc    Delete beneficiary
 * @access  Private
 */
export const deleteBeneficiary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const beneficiary = await Beneficiary.findOne({ _id: id, user: userId });

  if (!beneficiary) {
    throw new ApiError(404, 'Beneficiary not found');
  }

  beneficiary.isActive = false;
  await beneficiary.save();

  res.json(
    new ApiResponse(200, null, 'Beneficiary deleted successfully')
  );
});

