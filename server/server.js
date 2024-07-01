import dotenv from 'dotenv';
import connection from './config/dbConfig.js';
import Crime from './models/Crime.js';
import Person from './models/Person.js';
import PoliceOfficer from './models/PoliceOfficer.js';
import CourtCase from './models/CourtCase.js';
import CriminalRecord from './models/CriminalRecord.js';
import Witness from './models/Witness.js';

// Crime.getAll()
//   .then((result) => console.log(result))
//   .catch((error) => console.error(`Error getting all crimes: ${error}`));
//
// Crime.getById('4')
//   .then((result) => console.log(result))
//   .catch((error) => console.error(`Error getting crime by ID: ${error}`));

Witness.getAll()
  .then((result) => console.log(result))
  .catch((error) => console.error(`Error getting all crimes: ${error}`));
