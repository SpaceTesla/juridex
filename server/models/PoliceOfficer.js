// server/models/PoliceOfficer.js

import db from '../config/dbConfig.js';

const PoliceOfficer = {
  getAll: async () => {
    const sql = 'SELECT * FROM POLICE_OFFICER';
    try {
      const [rows, fields] = await db.promise().query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving police officers: ${error}`);
    }
  },
  getById: async (officerID) => {
    const sql = 'SELECT * FROM POLICE_OFFICER WHERE OfficerID = ?';
    try {
      const [rows, fields] = await db.promise().query(sql, [officerID]);
      return rows[0];
    } catch (error) {
      throw new Error(
        `Error retrieving police officer with ID ${officerID}: ${error}`,
      );
    }
  },
  create: async (officerData) => {
    const { FirstName, LastName, BadgeNumber, Rank, Department } = officerData;
    const sql =
      'INSERT INTO POLICE_OFFICER (FirstName, LastName, BadgeNumber, `Rank`, Department) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = await db
        .promise()
        .query(sql, [FirstName, LastName, BadgeNumber, Rank, Department]);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating police officer: ${error}`);
    }
  },
  update: async (officerID, officerData) => {
    const { FirstName, LastName, BadgeNumber, Rank, Department } = officerData;
    const sql =
      'UPDATE POLICE_OFFICER SET FirstName = ?, LastName = ?, BadgeNumber = ?, `Rank` = ?, Department = ? WHERE OfficerID = ?';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          FirstName,
          LastName,
          BadgeNumber,
          Rank,
          Department,
          officerID,
        ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(
        `Error updating police officer with ID ${officerID}: ${error}`,
      );
    }
  },
  delete: async (officerID) => {
    const sql = 'DELETE FROM POLICE_OFFICER WHERE OfficerID = ?';
    try {
      const [result] = await db.promise().query(sql, [officerID]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(
        `Error deleting police officer with ID ${officerID}: ${error}`,
      );
    }
  },
};

export default PoliceOfficer;
