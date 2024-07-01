import express from 'express';
import personController from '../controllers/personController.js';

const router = express.Router();

// Route to get all persons
router.get('/', personController.getAll);

// Route to get a person by ID
router.get('/:personId', personController.getById);

// Route to create a new person
router.post('/', personController.create);

// Route to update an existing person
router.put('/:personId', personController.update);

// Route to delete a person
router.delete('/:personId', personController.delete);

export default router;
