import React from 'react';
import Header from './components/Header';
import MainPage from './pages/Main'; 
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
