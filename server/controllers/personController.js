import Person from '../models/Person.js';

const personController = {
  getAll: async (req, res, next) => {
    try {
      const persons = await Person.getAll();
      res.json(persons);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    const { personId } = req.params;
    try {
      const person = await Person.getById(personId);
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const personData = req.body;
    try {
      const newPerson = await Person.create(personData);
      res.status(201).json(newPerson);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { personId } = req.params;
    const personData = req.body;
    try {
      const success = await Person.update(personId, personData);
      if (!success) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json({ message: 'Person updated successfully' });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { personId } = req.params;
    try {
      const success = await Person.delete(personId);
      if (!success) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json({ message: 'Person deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

export default personController;
