import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import OddsTable from './components/OddsTable';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <OddsTable />
      </main>
    </div>
  );
}

export default App;
