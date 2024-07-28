// models/User.js
import bcrypt from 'bcryptjs';
import connection from '../dbConfig.js';

export const findUserByUsername = (username, callback) => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    return callback(null, results[0]);
  });
};

export const comparePassword = (candidatePassword, hashedPassword, callback) => {
  bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch) => {
    if (err) {
      return callback(err, false);
    }
    return callback(null, isMatch);
  });
};
