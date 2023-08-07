import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/combined.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <pre>
          {JSON.stringify(data, null ,2)}
        </pre>

      </header>
    </div>
  );
}

export default App;
