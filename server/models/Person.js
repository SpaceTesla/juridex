// server/models/Person.js

import db from '../config/dbConfig.js';

const Person = {
  getAll: async () => {
    const sql = 'SELECT * FROM PERSON';
    try {
      const [rows, fields] = await db.promise().query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving persons: ${error}`);
    }
  },
  getById: async (personID) => {
    const sql = 'SELECT * FROM PERSON WHERE PersonID = ?';
    try {
      const [rows, fields] = await db.promise().query(sql, [personID]);
      return rows[0];
    } catch (error) {
      throw new Error(`Error retrieving person with ID ${personID}: ${error}`);
    }
  },
  create: async (personData) => {
    const { FirstName, LastName, DateOfBirth, Gender, Address, ContactInfo } =
      personData;
    const sql =
      'INSERT INTO PERSON (FirstName, LastName, DateOfBirth, Gender, Address, ContactInfo) VALUES (?, ?, ?, ?, ?, ?)';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          FirstName,
          LastName,
          DateOfBirth,
          Gender,
          Address,
          ContactInfo,
        ]);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating person: ${error}`);
    }
  },
  update: async (personID, personData) => {
    const { FirstName, LastName, DateOfBirth, Gender, Address, ContactInfo } =
      personData;
    const sql =
      'UPDATE PERSON SET FirstName = ?, LastName = ?, DateOfBirth = ?, Gender = ?, Address = ?, ContactInfo = ? WHERE PersonID = ?';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          FirstName,
          LastName,
          DateOfBirth,
          Gender,
          Address,
          ContactInfo,
          personID,
        ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating person with ID ${personID}: ${error}`);
    }
  },
  delete: async (personID) => {
    const sql = 'DELETE FROM PERSON WHERE PersonID = ?';
    try {
      const [result] = await db.promise().query(sql, [personID]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting person with ID ${personID}: ${error}`);
    }
  },
};

export default Person;
