import express from 'express';
import crimeController from '../controllers/crimeController.js';

const router = express.Router();

// Route to get all crimes
router.get('/', crimeController.getAll);

// Route to get a crime by ID
router.get('/:crimeId', crimeController.getById);

// Route to create a new crime
router.post('/', crimeController.create);

// Route to update an existing crime
router.put('/:crimeId', crimeController.update);

// Route to delete a crime
router.delete('/:crimeId', crimeController.delete);

export default router;
