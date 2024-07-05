import CourtCase from '../models/CourtCase.js';

const courtCaseController = {
  getAll: async (req, res, next) => {
    try {
      const courtCases = await CourtCase.getAll();
      res.json(courtCases);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    const { caseId } = req.params;
    try {
      const courtCase = await CourtCase.getById(caseId);
      if (!courtCase) {
        return res.status(404).json({ error: 'Court case not found' });
      }
      res.json(courtCase);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const courtCaseData = req.body;
    try {
      const newCourtCase = await CourtCase.create(courtCaseData);
      res.status(201).json(newCourtCase);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { caseId } = req.params;
    const courtCaseData = req.body;
    try {
      const success = await CourtCase.update(caseId, courtCaseData);
      if (!success) {
        return res.status(404).json({ error: 'Court case not found' });
      }
      res.json({ message: 'Court case updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { caseId } = req.params;
    try {
      const success = await CourtCase.delete(caseId);
      if (!success) {
        return res.status(404).json({ error: 'Court case not found' });
      }
      res.json({ message: 'Court case deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

export default courtCaseController;
