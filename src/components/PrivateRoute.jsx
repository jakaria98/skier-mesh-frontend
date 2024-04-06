import { Navigate } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
