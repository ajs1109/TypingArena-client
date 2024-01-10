// App.js

import React, { useState } from 'react';
import './App.css';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    // Navigate
  };

  return (
    <div className="app-container">
      <h1>Select Game Mode</h1>
      <div className="options-container">
        <div
          className={`option ${selectedOption === 'singleplayer' ? 'selected' : ''}`}
          onClick={() => window.location.assign('/singlePlayer')}
        >
          Singleplayer
        </div>
        <div
          className={`option ${selectedOption === 'multiplayer' ? 'selected' : ''}`}
          onClick={() => window.location.assign('/multiPlayer')}
        >
          Multiplayer
        </div>
      </div>
      {selectedOption && (
        <div className="selected-option">
          You have selected: <strong>{selectedOption}</strong>
        </div>
      )}
    </div>
  );
};

export default HomePage;
