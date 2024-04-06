import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import SlopesPage from './pages/SlopesPage';
import LiftsPage from './pages/LiftsPage';
import SearchPage from './pages/SearchPage';
import PrivateRoute from './components/PrivateRoute';
import CustomNavbar from './components/CustomNavbar';

function App() {
    return (
        <div className="App">
            <main>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/slopes"
                        element={
                            <PrivateRoute>
                                <SlopesPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/lifts"
                        element={
                            <PrivateRoute>
                                <LiftsPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/search" element={<SearchPage />} />
                    {/* Redirect any unknown routes to Home */}
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
