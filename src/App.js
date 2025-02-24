import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [terms, setTerms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTerms, setFilteredTerms] = useState([]);

  const apiUrl = 'https://951skqkgp9.execute-api.ap-south-1.amazonaws.com/dev'; // Replace with your API Gateway URL

  const handleSearch = () => {
    console.log('Fetching data from API...');
  
    axios
      .get(`${apiUrl}/get-definition`)
      .then(response => {
        console.log('API Response:', response.data);
        const allTerms = response.data || [];
        setTerms(allTerms);
  
        // Filter terms based on searchTerm
        const filtered = allTerms.filter((term) =>
          term.term.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTerms(filtered);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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
        <button onClick={handleSearch}>Search</button> {/* Add Search button */}
      </header>
      <div className="dictionary-container">
        {filteredTerms.map((term) => (
          <div key={term.id || term.term} className="card">
            <h3>{term.term}</h3>
            <p>{term.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
