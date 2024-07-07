import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import crimeRoutes from './routes/crimeRoutes.js';
import personRoutes from './routes/personRoutes.js';
import criminalRecordRoutes from './routes/criminalRecordRoutes.js';
import policeOfficerRoutes from './routes/policeOfficerRoutes.js';
import courtCaseRoutes from './routes/courtCaseRoutes.js';
import witnessRoutes from './routes/witnessRoutes.js';
import './dbConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/crimes', crimeRoutes);
app.use('/api/persons', personRoutes);
app.use('/api/criminal-records', criminalRecordRoutes);
app.use('/api/police-officers', policeOfficerRoutes);
app.use('/api/court-cases', courtCaseRoutes);
app.use('/api/witnesses', witnessRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});