// server/models/Witness.js

import db from '../config/dbConfig.js';

const Witness = {
  getAll: async () => {
    const sql = 'SELECT * FROM WITNESS';
    try {
      const [rows, fields] = await db.promise().query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving witnesses: ${error}`);
    }
  },
  getById: async (witnessID) => {
    const sql = 'SELECT * FROM WITNESS WHERE WitnessID = ?';
    try {
      const [rows, fields] = await db.promise().query(sql, [witnessID]);
      return rows[0];
    } catch (error) {
      throw new Error(
        `Error retrieving witness with ID ${witnessID}: ${error}`,
      );
    }
  },
  create: async (witnessData) => {
    const { CaseID, CrimeID, FirstName, LastName, Statement } = witnessData;
    const sql =
      'INSERT INTO WITNESS (CaseID, CrimeID, FirstName, LastName, Statement) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = await db
        .promise()
        .query(sql, [CaseID, CrimeID, FirstName, LastName, Statement]);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating witness: ${error}`);
    }
  },
  update: async (witnessID, witnessData) => {
    const { CaseID, CrimeID, FirstName, LastName, Statement } = witnessData;
    const sql =
      'UPDATE WITNESS SET CaseID = ?, CrimeID = ?, FirstName = ?, LastName = ?, Statement = ? WHERE WitnessID = ?';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          CaseID,
          CrimeID,
          FirstName,
          LastName,
          Statement,
          witnessID,
        ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating witness with ID ${witnessID}: ${error}`);
    }
  },
  delete: async (witnessID) => {
    const sql = 'DELETE FROM WITNESS WHERE WitnessID = ?';
    try {
      const [result] = await db.promise().query(sql, [witnessID]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting witness with ID ${witnessID}: ${error}`);
    }
  },
};

export default Witness;
