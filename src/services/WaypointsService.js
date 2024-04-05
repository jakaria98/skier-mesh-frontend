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

const getShortestPath = (data) => {
    const result = axios.get(`${API_URL}/shortestPath/${data.startId}/${data.endId}`);
    return result;
};

export default {
    getWaypoints,
    getAllPaths,
    getShortestPath,
    getAllPathByDifficultyLevel
};
