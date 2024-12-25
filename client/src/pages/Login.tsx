import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setAllPageEmail, setAllPagePassword } from '../redux/reducers';

const LoginStyle = styled.div`
    text-align: center;
    display: flex;
     flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh; 
`
const ErrorMessage = styled.div`
    border: 1px solid #eb4034;
    padding: 10px;
    color: #eb4034;
    background-color: #f2d1ce;
    margin-top: 5vh;
   
`;

const LoginButton = styled.div`
    width: 20vw;
    background-color: #FF6A49;
    color: white;
    border-radius: 10px;
    margin-top: 30px;
    height: 8vh;
    font-family: Itim;
    font-size: 120%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AccountText = styled.div`
    color: #FF6A49;
    font-family: Itim;
    margin-top: 2vh;
`;

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login-user', { email, password });
            if(response.data.message == 'this is the correct user'){
                dispatch(setAllPagePassword(password));
                dispatch(setAllPageEmail(email));
            }
            else if (response.data.message == 'incorrect password'){
                setErrorText("Incorrect password")
            }
            else if (response.data.message == 'cannot connect'){
                alert("Cannot Connect. Please try again");
            }
            else {
                setErrorText("Cannot find user account")
            }

        } catch(error){
            console.log(error);
        }
    }

    return (
        <LoginStyle>
            <div className="text fortypx">Login</div>
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} login={true} />
            <LoginButton onClick={login}>Login</LoginButton>
            <AccountText onClick={() => navigate("/signup")}>Don't have an account? <u>Sign up here</u></AccountText>
            {errorText ? <ErrorMessage>
                <span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#FF4C4C" />
                        <line x1="12" y1="7" x2="12" y2="14" stroke="#FFFFFF" stroke-width="2" />
                        <circle cx="12" cy="17" r="1.5" fill="#FFFFFF" />
                    </svg></span>
                {errorText}
            </ErrorMessage> : <div />}
        </LoginStyle>
    );
}

export default Login; 