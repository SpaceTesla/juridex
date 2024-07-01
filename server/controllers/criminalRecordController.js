import CriminalRecord from '../models/CriminalRecord.js';

const criminalRecordController = {
  getAll: async (req, res, next) => {
    try {
      const criminalRecords = await CriminalRecord.getAll();
      res.json(criminalRecords);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    const { personId, crimeId } = req.params;
    try {
      const criminalRecord = await CriminalRecord.getById(personId, crimeId);
      if (!criminalRecord) {
        return res.status(404).json({ error: 'Criminal record not found' });
      }
      res.json(criminalRecord);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const criminalRecordData = req.body;
    try {
      const newCriminalRecord = await CriminalRecord.create(criminalRecordData);
      res.status(201).json(newCriminalRecord);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { personId, crimeId } = req.params;
    const criminalRecordData = req.body;
    try {
      const success = await CriminalRecord.update(
        personId,
        crimeId,
        criminalRecordData,
      );
      if (!success) {
        return res.status(404).json({ error: 'Criminal record not found' });
      }
      res.json({ message: 'Criminal record updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { personId, crimeId } = req.params;
    try {
      const success = await CriminalRecord.delete(personId, crimeId);
      if (!success) {
        return res.status(404).json({ error: 'Criminal record not found' });
      }
      res.json({ message: 'Criminal record deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

export default criminalRecordController;
