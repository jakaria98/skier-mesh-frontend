import axios from 'axios';
import authHeader from '../utils/auth-header';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/slopes`;

const getSlopes = () => axios.get(API_URL, { headers: authHeader() });

const getSlopeById = (id) => axios.get(`${API_URL}/${id}`, { headers: authHeader() });

const createSlope = (slopeData) => axios.post(API_URL, slopeData, { headers: authHeader() });

const updateSlope = (id, slopeData) => axios.put(`${API_URL}/${id}`, slopeData, { headers: authHeader() });

const deleteSlope = (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

export default {
  getSlopes,
  getSlopeById,
  createSlope,
  updateSlope,
  deleteSlope,
};