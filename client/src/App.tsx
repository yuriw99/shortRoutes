import React from 'react';
import Header from './components/Header';
import MainPage from './pages/Main'; 
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PricingPage from './pages/Pricing';
import ConfirmationPage from './pages/Confirmation'; 
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
          <Route path="/pricing" element={<PricingPage/>}/>
          <Route path="/confirmation" element={<ConfirmationPage />}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
