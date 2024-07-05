// server/models/CourtCase.js

import db from '../config/dbConfig.js';

const CourtCase = {
  getAll: async () => {
    const sql = 'SELECT * FROM COURT_CASE';
    try {
      const [rows, fields] = await db.promise().query(sql);
      return rows;
    } catch (error) {
      throw new Error(`Error retrieving court cases: ${error}`);
    }
  },
  getById: async (caseID) => {
    const sql = 'SELECT * FROM COURT_CASE WHERE CaseID = ?';
    try {
      const [rows, fields] = await db.promise().query(sql, [caseID]);
      return rows[0];
    } catch (error) {
      throw new Error(
        `Error retrieving court case with ID ${caseID}: ${error}`,
      );
    }
  },
  create: async (caseData) => {
    const { CrimeID, CourtDate, JudgeName, Verdict, Sentence, OfficerID } =
      caseData;
    const sql =
      'INSERT INTO COURT_CASE (CrimeID, CourtDate, JudgeName, Verdict, Sentence, OfficerID) VALUES (?, ?, ?, ?, ?, ?)';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          CrimeID,
          CourtDate,
          JudgeName,
          Verdict,
          Sentence,
          OfficerID,
        ]);
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating court case: ${error}`);
    }
  },
  update: async (caseID, caseData) => {
    const { CrimeID, CourtDate, JudgeName, Verdict, Sentence, OfficerID } =
      caseData;
    const sql =
      'UPDATE COURT_CASE SET CrimeID = ?, CourtDate = ?, JudgeName = ?, Verdict = ?, Sentence = ?, OfficerID = ? WHERE CaseID = ?';
    try {
      const [result] = await db
        .promise()
        .query(sql, [
          CrimeID,
          CourtDate,
          JudgeName,
          Verdict,
          Sentence,
          OfficerID,
          caseID,
        ]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error updating court case with ID ${caseID}: ${error}`);
    }
  },
  delete: async (caseID) => {
    const sql = 'DELETE FROM COURT_CASE WHERE CaseID = ?';
    try {
      const [result] = await db.promise().query(sql, [caseID]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting court case with ID ${caseID}: ${error}`);
    }
  },
};

export default CourtCase;
