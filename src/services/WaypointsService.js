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
    const result = axios.post(`${API_URL}/shortestPathbyTime`, data);
    console.log(data);
    console.log(result);
    return result;
};

const getLongestPath = (data) => {
    const result = axios.post(`${API_URL}/longestPathByTime`, data);
    console.log(data);
    console.log(result);
    return result;
};

const getEasiestPath = (data) => {
    const result = axios.post(`${API_URL}/easiestPath`, data);
    console.log(data);
    console.log(result);
    return result;
};

export default {
    getWaypoints,
    getAllPaths,
    getShortestPath,
    getAllPathByDifficultyLevel,
    getEasiestPath,
    getLongestPath
};
