import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/search`;

// Assuming your backend has a unified search endpoint or you could adjust to specific ones
const search = (query) => axios.get(`${API_URL}?q=${query}`, { headers: authHeader() });

export default {
  search,
};
