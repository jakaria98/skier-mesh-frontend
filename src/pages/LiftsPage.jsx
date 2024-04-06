import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LiftList from './sub/LiftList';

function LiftsPage() {
    const [lifts, setLifts] = useState([]);

    useEffect(() => {
        console.log("Fetch lifts logic here");
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h2>Lifts</h2>
                <LiftList lifts={lifts} />
            </main>
            <Footer />
        </div>
    );
}

export default LiftsPage;
