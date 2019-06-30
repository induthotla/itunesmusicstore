import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import MusicListing from './components/MusicListing';
import './css/itunes.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Route exact path="/" component={MusicListing} />               
      </div>
    </Router>
  );
}

export default App;
