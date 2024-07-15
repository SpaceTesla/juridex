import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import crimeRoutes from './routes/crimeRoutes.js';
import personRoutes from './routes/personRoutes.js';
import criminalRecordRoutes from './routes/criminalRecordRoutes.js';
import policeOfficerRoutes from './routes/policeOfficerRoutes.js';
import courtCaseRoutes from './routes/courtCaseRoutes.js';
import witnessRoutes from './routes/witnessRoutes.js';
import './config/dbConfig.js';

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get('/api/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  });
});

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