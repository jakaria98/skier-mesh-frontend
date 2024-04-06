import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SlopeList from './sub/SlopeList';
import SlopesService from '../services/SlopesService';

function SlopesPage() {
    const [slopes, setSlopes] = useState([]);

    useEffect(() => {
        console.log("Fetch slopes logic here");
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h2>Slopes</h2>
                <SlopeList slopes={slopes} />
            </main>
            <Footer />
        </div>
    );
}

export default SlopesPage;
