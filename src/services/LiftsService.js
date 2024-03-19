import axios from 'axios';
import authHeader from '../utils/auth-header';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/lifts`;

const getLifts = () => axios.get(API_URL, { headers: authHeader() });

const getLiftById = (id) => axios.get(`${API_URL}/${id}`, { headers: authHeader() });

const createLift = (liftData) => axios.post(API_URL, liftData, { headers: authHeader() });

const updateLift = (id, liftData) => axios.put(`${API_URL}/${id}`, liftData, { headers: authHeader() });

const deleteLift = (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

export default {
  getLifts,
  getLiftById,
  createLift,
  updateLift,
  deleteLift,
};