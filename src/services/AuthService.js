import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/users/`;

const register = async (username, email, password) => {
  const response = await axios.post(`${API_URL}register`, {
    username,
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}login`, {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout,
};
