import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={LoginComponent}/>
        
      </div>
    </Router>
  );
}

export default App;
