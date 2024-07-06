// server/services/api.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

// Function to fetch cases from the server
export const fetchCases = async () => {
  try {
    const response = await axios.get(`${API_URL}/cases`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch cases: ${error}`);
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

// Function to fetch persons from the server
export const fetchPersons = async () => {
  try {
    const response = await axios.get(`${API_URL}/persons`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch persons: ${error}`);
  }
};

// Function to fetch police officers from the server
export const fetchPoliceOfficers = async () => {
  try {
    const response = await axios.get(`${API_URL}/policeOfficers`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch police officers: ${error}`);
  }
};

// Function to fetch records from the server
export const fetchRecords = async () => {
  try {
    const response = await axios.get(`${API_URL}/records`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch records: ${error}`);
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

// Example login function (replace with your actual authentication logic)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to login: ${error}`);
  }
};
