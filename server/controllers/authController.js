// controllers/authController.js
import jwt from 'jsonwebtoken';
import { findUserByUsername, comparePassword } from '../models/User.js';

export const loginUser = (req, res) => {
  const { username, password } = req.body;

  findUserByUsername(username, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', err });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords', err });
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
    });
  });
};
