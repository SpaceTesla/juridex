// server/models/CriminalRecord.js

import db from '../config/dbConfig.js';

const CriminalRecord = {
  getAll: async () => {
    const sql = 'SELECT * FROM CRIMINAL_RECORD';
    try {
      const [rows, fields] = await db.promise().query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving criminal records: ${error}`);
    }
  },
  getByPersonCrimeIds: async (personID, crimeID) => {
    const sql =
      'SELECT * FROM CRIMINAL_RECORD WHERE PersonID = ? AND CrimeID = ?';
    try {
      const [rows, fields] = await db.promise().query(sql, [personID, crimeID]);
      return rows[0];
    } catch (error) {
      throw new Error(
        `Error retrieving criminal record with PersonID ${personID} and CrimeID ${crimeID}: ${error}`,
      );
    }
  },
  create: async (recordData) => {
    const { PersonID, CrimeID, DateOfRecord, RecordStatus } = recordData;
    const sql =
      'INSERT INTO CRIMINAL_RECORD (PersonID, CrimeID, DateOfRecord, RecordStatus) VALUES (?, ?, ?, ?)';
    try {
      const [result] = await db
        .promise()
        .query(sql, [PersonID, CrimeID, DateOfRecord, RecordStatus]);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating criminal record: ${error}`);
    }
  },
  update: async (personID, crimeID, recordData) => {
    const { DateOfRecord, RecordStatus } = recordData;
    const sql =
      'UPDATE CRIMINAL_RECORD SET DateOfRecord = ?, RecordStatus = ? WHERE PersonID = ? AND CrimeID = ?';
    try {
      const [result] = await db
        .promise()
        .query(sql, [DateOfRecord, RecordStatus, personID, crimeID]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(
        `Error updating criminal record with PersonID ${personID} and CrimeID ${crimeID}: ${error}`,
      );
    }
  },
  delete: async (personID, crimeID) => {
    const sql =
      'DELETE FROM CRIMINAL_RECORD WHERE PersonID = ? AND CrimeID = ?';
    try {
      const [result] = await db.promise().query(sql, [personID, crimeID]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(
        `Error deleting criminal record with PersonID ${personID} and CrimeID ${crimeID}: ${error}`,
      );
    }
  },
};

export default CriminalRecord;
