import Crime from '../models/Crime.js';

const crimeController = {
  getAll: async (req, res, next) => {
    try {
      const crimes = await Crime.getAll();
      res.json(crimes);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    const { crimeId } = req.params;
    try {
      const crime = await Crime.getById(crimeId);
      if (!crime) {
        return res.status(404).json({ error: 'Crime not found' });
      }
      res.json(crime);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const crimeData = req.body;
    try {
      const newCrime = await Crime.create(crimeData);
      res.status(201).json(newCrime);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { crimeId } = req.params;
    const crimeData = req.body;
    try {
      const success = await Crime.update(crimeId, crimeData);
      if (!success) {
        return res.status(404).json({ error: 'Crime not found' });
      }
      res.json({ message: 'Crime updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { crimeId } = req.params;
    try {
      const success = await Crime.delete(crimeId);
      if (!success) {
        return res.status(404).json({ error: 'Crime not found' });
      }
      res.json({ message: 'Crime deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

export default crimeController;
