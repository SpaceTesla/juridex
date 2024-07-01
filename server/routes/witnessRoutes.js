import express from 'express';
import witnessController from '../controllers/witnessController.js';

const router = express.Router();

// Route to get all witnesses
router.get('/', witnessController.getAll);

// Route to get a witness by ID
router.get('/:witnessId', witnessController.getById);

// Route to create a new witness
router.post('/', witnessController.create);

// Route to update an existing witness
router.put('/:witnessId', witnessController.update);

// Route to delete a witness
router.delete('/:witnessId', witnessController.delete);

export default router;
