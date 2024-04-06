import axios from 'axios';
import authHeader from '../utils/auth-header';

const API_URL = `${import.meta.env.VITE_APP_API_BASE_URL}/waypoints`;

// const getWaypoints = () => axios.get(API_URL, { headers: authHeader() })
const getWaypoints = () => axios.get(API_URL);
const getAllPaths = (data) => {
    const result = axios.get(`${API_URL}/allPaths/${data.startId}/${data.endId}`);
    return result;
};
const getAllPathByDifficultyLevel = (data) => {
    const result = axios.post(`${API_URL}/allByPathByDifficultyLevel`, data);
    return result;
};

const getShortestPathByTime = (data) => {
  const result = axios.post(`${API_URL}/shortestPathbyTime`, data);
  return result;
};
const getLongestPathByTime = (data) => {
    const result = axios.post(`${API_URL}/longestPathbyTime`, data);
    return result;
};

const getLongestPath = (data) => {
    const result = axios.post(`${API_URL}/longestPathByTime`, data);
    return result;
};

const getEasiestPath = (data) => {
    const result = axios.post(`${API_URL}/easiestPath`, data);
    return result;
};

const getMinLiftUsagePath = (data) => {
    const result = axios.post(`${API_URL}/minLiftUsagePath`, data);
    return result;
};

export default {
    getWaypoints,
    getAllPaths,
    getShortestPathByTime,
    getLongestPathByTime,
    getAllPathByDifficultyLevel,
    getEasiestPath,
    getLongestPath,
    getMinLiftUsagePath
};
