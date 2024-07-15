import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your actual API URL

const fetchFirebaseConfig = async () => {
  try {
    const response = await axios.get(`${API_URL}/firebase-config`);
    if (!response.data) throw new Error('Failed to fetch Firebase config');
    return response.data;
  } catch (error) {
    console.error('Error fetching Firebase config:', error);
    throw error;
  }
};

const initializeFirebaseApp = async () => {
  try {
    const firebaseConfig = await fetchFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    return getAuth(app);
  } catch (error) {
    console.error('Error initializing Firebase app:', error);
    throw error;
  }
};

export const auth = initializeFirebaseApp();
