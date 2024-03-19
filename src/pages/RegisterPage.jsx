import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Assume AuthService handles communication with your backend
// import AuthService from '../services/AuthService';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Call to AuthService for registration logic
        // await AuthService.register(username, email, password);
        console.log("Registration submitted:", username, email, password);
    };

    return (
        <div>
            <Header />
            <main>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Register</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default RegisterPage;
