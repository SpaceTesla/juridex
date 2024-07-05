import express from 'express';
import policeOfficerController from '../controllers/policeOfficerController.js';

const router = express.Router();

// Route to get all police officers
router.get('/', policeOfficerController.getAll);

// Route to get a police officer by ID
router.get('/:officerId', policeOfficerController.getById);

// Route to create a new police officer
router.post('/', policeOfficerController.create);

// Route to update an existing police officer
router.put('/:officerId', policeOfficerController.update);

// Route to delete a police officer
router.delete('/:officerId', policeOfficerController.delete);

export default router;
