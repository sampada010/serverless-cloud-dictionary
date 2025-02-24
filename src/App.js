import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [terms, setTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = 'https://951skqkgp9.execute-api.ap-south-1.amazonaws.com/dev';

  const handleSearch = () => {
    console.log('Fetching data from API...');

    // Construct the URL based on searchTerm
    const url = searchTerm
      ? `${apiUrl}/get-definition?term=${encodeURIComponent(searchTerm)}`
      : `${apiUrl}/get-definition`;

    axios
      .get(url)
      .then(response => {
        console.log('Raw API Response:', response);
        console.log('Response Data:', response.data);

        // Handle response
        const allTerms = Array.isArray(response.data) ? response.data : [];

        setTerms(allTerms);

        // Filter terms based on search input
        const filtered = allTerms.filter((term) =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTerms(filtered);
        setError(''); // Clear previous errors
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data from API.');
        setFilteredTerms([]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cloud Dictionary</h1>
        <input
          type="text"
          placeholder="Search for a term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </header>

      <div className="dictionary-container">
        {error && <p className="error-message">{error}</p>}

        {filteredTerms.length > 0 ? (
          filteredTerms.map((term) => (
            <div key={term.id || term.term} className="card">
              <h3>{term.term}</h3>
              <p>{term.definition}</p>
            </div>
          ))
        ) : (
          <p>{terms.length === 0 ? 'No terms found.' : 'Start typing to search for a term.'}</p>
        )}
      </div>
    </div>
  );
};

export default App;
