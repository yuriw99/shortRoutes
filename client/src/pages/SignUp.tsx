import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import axios from 'axios';



const SignUpStyle = styled.div`
    text-align: center;
    display: flex;
     flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh; 
`

const SignUpButton = styled.div`
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

const ErrorMessage = styled.div`
    border: 1px solid #eb4034;
    padding: 10px;
    color: #eb4034;
    background-color: #f2d1ce;
    margin-top: 5vh;
   
`

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");

    const validateEmailPassword = () => {
        const specialCharacterRegex = /[^a-zA-Z0-9]/;
        const numRegex = /[0-9]/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (password.length < 10) {
            setErrorText("Your password needs to be more than 10 characters");
        }
        else if (password.length > 15) {
            setErrorText("Your password needs to be less than 15 characters");
        }
        else if (!specialCharacterRegex.test(password)){
            setErrorText("Your password needs to contain at least one special character");
        }
        else if(!numRegex.test(password)){
            setErrorText("Your password needs to contain at least one digit");
        }
        else if (!emailRegex.test(email)){
            setErrorText("Please enter a valid email");
        }
        else {
            setErrorText("");
        }
    }

    const signUpUser = () => {
        validateEmailPassword();
        handleSignUp(); 
    }

    const handleSignUp = async () => {
        try {
          const response = await axios.post('http://localhost:5000/signup', { email, password });
          console.log(response.data.message);
        } catch (error) {
          console.error('Error signing up', error);
        }
      }

    return (
        <SignUpStyle>
            <div className="text fortypx">Sign Up</div>
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} login={false} />
            <SignUpButton onClick={signUpUser}>Create an Account</SignUpButton>
            {errorText ? <ErrorMessage>
                <span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#FF4C4C" />
                        <line x1="12" y1="7" x2="12" y2="14" stroke="#FFFFFF" stroke-width="2" />
                        <circle cx="12" cy="17" r="1.5" fill="#FFFFFF" />
                    </svg></span>
                {errorText}
            </ErrorMessage> : <div />}
        </SignUpStyle>
    );
}

export default SignUp; 