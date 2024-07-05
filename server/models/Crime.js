// server/models/Crime.js

import db from '../config/dbConfig.js';

const Crime = {
  getAll: async () => {
    const sql = 'SELECT * FROM CRIME';
    try {
      const [rows, fields] = await db.promise().query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving crimes: ${error}`);
    }
  },
  getById: async (crimeID) => {
    const sql = 'SELECT * FROM CRIME WHERE CrimeID = ?';
    try {
      const [rows, fields] = await db.promise().query(sql, [crimeID]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error retrieving crime with ID ${crimeID}: ${error}`);
    }
  },
  create: async (crimeData) => {
    const {
      CrimeType,
      Description,
      DateOfCrime,
      Location,
      Latitude,
      Longitude,
    } = crimeData;
    const sql =
      'INSERT INTO CRIME (CrimeType, Description, DateOfCrime, Location, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?)';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          CrimeType,
          Description,
          DateOfCrime,
          Location,
          Latitude,
          Longitude,
        ]);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating crime: ${error}`);
    }
  },
  update: async (crimeID, crimeData) => {
    const {
      CrimeType,
      Description,
      DateOfCrime,
      Location,
      Latitude,
      Longitude,
    } = crimeData;
    const sql =
      'UPDATE CRIME SET CrimeType = ?, Description = ?, DateOfCrime = ?, Location = ?, Latitude = ?, Longitude = ? WHERE CrimeID = ?';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          CrimeType,
          Description,
          DateOfCrime,
          Location,
          Latitude,
          Longitude,
          crimeID,
        ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating crime with ID ${crimeID}: ${error}`);
    }
  },
  delete: async (crimeID) => {
    const sql = 'DELETE FROM CRIME WHERE CrimeID = ?';
    try {
      const [result] = await db.promise().query(sql, [crimeID]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting crime with ID ${crimeID}: ${error}`);
    }
  },
};

export default Crime;
