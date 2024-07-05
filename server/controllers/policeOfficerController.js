import PoliceOfficer from '../models/PoliceOfficer.js';

const policeOfficerController = {
  getAll: async (req, res, next) => {
    try {
      const officers = await PoliceOfficer.getAll();
      res.json(officers);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    const { officerId } = req.params;
    try {
      const officer = await PoliceOfficer.getById(officerId);
      if (!officer) {
        return res.status(404).json({ error: 'Police officer not found' });
      }
      res.json(officer);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const officerData = req.body;
    try {
      const newOfficer = await PoliceOfficer.create(officerData);
      res.status(201).json(newOfficer);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { officerId } = req.params;
    const officerData = req.body;
    try {
      const success = await PoliceOfficer.update(officerId, officerData);
      if (!success) {
        return res.status(404).json({ error: 'Police officer not found' });
      }
      res.json({ message: 'Police officer updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { officerId } = req.params;
    try {
      const success = await PoliceOfficer.delete(officerId);
      if (!success) {
        return res.status(404).json({ error: 'Police officer not found' });
      }
      res.json({ message: 'Police officer deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

export default policeOfficerController;
