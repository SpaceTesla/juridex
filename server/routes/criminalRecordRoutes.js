import express from 'express';
import criminalRecordController from '../controllers/criminalRecordController.js';

const router = express.Router();

// Route to get all criminal records
router.get('/', criminalRecordController.getAll);

// Route to get a criminal record by person ID and crime ID
router.get('/:personId/:crimeId', criminalRecordController.getById);

// Route to create a new criminal record
router.post('/', criminalRecordController.create);

// Route to update an existing criminal record
router.put('/:personId/:crimeId', criminalRecordController.update);

// Route to delete a criminal record
router.delete('/:personId/:crimeId', criminalRecordController.delete);

export default router;
