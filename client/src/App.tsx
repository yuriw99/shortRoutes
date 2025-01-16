import React, {useEffect} from 'react';
import Header from './components/Header';
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PricingPage from './pages/Pricing';
import ConfirmationPage from './pages/Confirmation';
import CareersPage from './pages/Careers';
import SuccessPage from './pages/ConfirmSuccess';
import RoutesPage from './pages/Routes';
import RoutesListPage from './pages/RoutesList';
import ResultsPage from './pages/Results';
import ForgetPasswordPage from './pages/ForgetPassword'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import { setAllPageEmail, setAllPagePassword } from './redux/reducers';
import axios from 'axios';
import './App.css';



function App() {

  const dispatch = useDispatch<AppDispatch>();

  const getUserInfo = async () => {
    const response = await axios.get('http://localhost:5000/user');
    if (response.data.email && response.data.password){
        dispatch(setAllPagePassword(response.data.password));
        dispatch(setAllPageEmail(response.data.email));
    }
  }

  useEffect(() => {
          getUserInfo();
      }, []);

  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/findRoutes" element={<RoutesPage />} />
          <Route path="/routesList" element={<RoutesListPage/>} />
          <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
          <Route path="/results" element={<ResultsPage/>}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;
