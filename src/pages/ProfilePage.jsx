import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ProfilePage() {
    const [userProfile, setUserProfile] = useState({ username: '', email: '' });

    useEffect(() => {
        console.log("Fetch user profile logic here");
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h2>User Profile</h2>
                <div>Username: {userProfile.username}</div>
                <div>Email: {userProfile.email}</div>
            </main>
            <Footer />
        </div>
    );
}

export default ProfilePage;
