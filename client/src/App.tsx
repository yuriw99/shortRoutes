import React from 'react';
import Header from './components/Header';
import MainPage from './pages/Main'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
