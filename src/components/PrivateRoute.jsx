import { Navigate } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated'; // Your auth check function

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
