import axios from 'axios';
import authHeader from '../utils/auth-header';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/waypoints`;

const getWaypoints = () => axios.get(API_URL, { headers: authHeader() });

export default {
  getWaypoints
};