import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [terms, setTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = 'https://951skqkgp9.execute-api.ap-south-1.amazonaws.com/dev';

  // Fetch terms on component mount
  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = () => {
    axios
      .get(apiUrl)
      .then((response) => {
        const allTerms = Array.isArray(response.data) ? response.data : [];
        console.log('Fetched Terms:', allTerms);

        setTerms(allTerms);
        setFilteredTerms(allTerms); // Show all terms by default
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data from API.');
      });
  };

  // Handle search input
  const handleSearch = () => {
    if (!searchTerm) {
      setFilteredTerms(terms); // Reset to show all terms if the search input is empty
      return;
    }

    const filtered = terms.filter((term) =>
      term.term.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTerms(filtered);
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
          <p>No terms found. Try a different search term.</p>
        )}
      </div>
    </div>
  );
};

export default App;
