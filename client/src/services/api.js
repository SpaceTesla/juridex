import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Function to fetch cases from the server
export const fetchCases = async () => {
  try {
    const response = await axios.get(`${API_URL}/court-cases`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch cases: ${error}`);
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await axios.post(`${API_URL}/court-cases`, caseData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create case: ${error}`);
  }
};

export const updateCase = async (caseId, caseData) => {
  try {
    const response = await axios.put(`${API_URL}/court-cases/${caseId}`, caseData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update case: ${error}`);
  }
};

// Function to fetch crimes from the server
export const fetchCrimes = async () => {
  try {
    const response = await axios.get(`${API_URL}/crimes`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch crimes: ${error}`);
  }
};

export const createCrime = async (crimeData) => {
  try {
    const response = await axios.post(`${API_URL}/crimes`, crimeData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create crime: ${error}`);
  }
};

export const updateCrime = async (crimeId, crimeData) => {
  try {
    const response = await axios.put(`${API_URL}/crimes/${crimeId}`, crimeData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update crime: ${error}`);
  }
};

// Function to fetch persons from the server
export const fetchPersons = async () => {
  try {
    const response = await axios.get(`${API_URL}/persons`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch persons: ${error}`);
  }
};

export const createPerson = async (personData) => {
  try {
    const response = await axios.post(`${API_URL}/persons`, personData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create person: ${error}`);
  }
};

export const updatePerson = async (personId, personData) => {
  try {
    const response = await axios.put(`${API_URL}/persons/${personId}`, personData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update person: ${error}`);
  }
};

// Function to fetch police officers from the server
export const fetchPoliceOfficers = async () => {
  try {
    const response = await axios.get(`${API_URL}/police-officers`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch police officers: ${error}`);
  }
};

export const createPoliceOfficer = async (officerData) => {
  try {
    const response = await axios.post(`${API_URL}/police-officers`, officerData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create police officer: ${error}`);
  }
};

export const updatePoliceOfficer = async (officerId, officerData) => {
  try {
    const response = await axios.put(`${API_URL}/police-officers/${officerId}`, officerData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update police officer: ${error}`);
  }
};

// Function to fetch records from the server
export const fetchRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}/criminal-records`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch records: ${error}`);
  }
};

// Create a new record
export const createRecord = async (newRecordData) => {
  try {
    const response = await axios.post(`${API_URL}/criminal-records`, newRecordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing record
export const updateRecord = async (personId, crimeId, updatedRecordData) => {
  try {
    const response = await axios.put(`${API_URL}/criminal-records/${personId}/${crimeId}`, updatedRecordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to fetch witnesses from the server
export const fetchWitnesses = async () => {
  try {
    const response = await axios.get(`${API_URL}/witnesses`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch witnesses: ${error}`);
  }
};

// Function to create a new witness on the server
export const createWitness = async (witnessData) => {
  try {
    const response = await axios.post(`${API_URL}/witnesses`, witnessData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create witness: ${error}`);
  }
};

// Function to update an existing witness on the server
export const updateWitness = async (witnessId, witnessData) => {
  try {
    const response = await axios.put(`${API_URL}/witnesses/${witnessId}`, witnessData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update witness: ${error}`);
  }
};

// Example login function (replace with your actual authentication logic)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to login: ${error}`);
  }
};
