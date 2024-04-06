import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <Header />
            <main>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </main>
            <Footer />
        </div>
    );
}

export default LoginPage;
