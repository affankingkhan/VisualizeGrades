import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from "./components/main";


function App() {
  return (
    <Router>
      <Route path="/" component={Main} />
    </Router>
  );
}

export default App;
