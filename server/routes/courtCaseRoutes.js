import express from 'express';
import courtCaseController from '../controllers/courtCaseController.js';

const router = express.Router();

// Route to get all court cases
router.get('/', courtCaseController.getAll);

// Route to get a court case by ID
router.get('/:caseId', courtCaseController.getById);

// Route to create a new court case
router.post('/', courtCaseController.create);

// Route to update an existing court case
router.put('/:caseId', courtCaseController.update);

// Route to delete a court case
router.delete('/:caseId', courtCaseController.delete);

export default router;
