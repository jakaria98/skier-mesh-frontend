import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/search`;

const search = (query) => axios.get(`${API_URL}?q=${query}`, { headers: authHeader() });

export default {
  search,
};
