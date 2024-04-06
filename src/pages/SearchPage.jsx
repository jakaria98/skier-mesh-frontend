import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search logic here for query:", query);
    };

    return (
        <div>
            <Header />
            <main>
                <h2>Search</h2>
                <form onSubmit={handleSearch}>
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
                <div>
                    {results.map((result, index) => (
                        <div key={index}>{result.name}</div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default SearchPage;
