import axios from 'axios';
import authHeader from '../utils/auth-header';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/users/profile`;

const getProfile = async () => {
  const response = await axios.get(API_URL, { headers: authHeader() });
  return response.data;
};

const updateProfile = async (userData) => {
  const response = await axios.put(API_URL, userData, { headers: authHeader() });
  return response.data;
};

export default {
  getProfile,
  updateProfile,
};
