import Witness from '../models/Witness.js';

const witnessController = {
  getAll: async (req, res, next) => {
    try {
      const witnesses = await Witness.getAll();
      res.json(witnesses);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    const { witnessId } = req.params;
    try {
      const witness = await Witness.getById(witnessId);
      if (!witness) {
        return res.status(404).json({ error: 'Witness not found' });
      }
      res.json(witness);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const witnessData = req.body;
    try {
      const newWitness = await Witness.create(witnessData);
      res.status(201).json(newWitness);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { witnessId } = req.params;
    const witnessData = req.body;
    try {
      const success = await Witness.update(witnessId, witnessData);
      if (!success) {
        return res.status(404).json({ error: 'Witness not found' });
      }
      res.json({ message: 'Witness updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { witnessId } = req.params;
    try {
      const success = await Witness.delete(witnessId);
      if (!success) {
        return res.status(404).json({ error: 'Witness not found' });
      }
      res.json({ message: 'Witness deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

export default witnessController;
