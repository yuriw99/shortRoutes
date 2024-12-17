import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components' ;
import EmailInput from '../components/EmailInput'; 
import PasswordInput from '../components/PasswordInput'; 

const LoginStyle = styled.div`
    text-align: center;
    display: flex;
     flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh; 
`

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
    const navigate = useNavigate();

    return ( 
        <LoginStyle> 
            <div className="text fortypx">Login</div>
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} login={true} />
            <LoginButton>Login</LoginButton>
            <AccountText onClick={()=>navigate("/signup")}>Don't have an account? <u>Sign up here</u></AccountText>
        </LoginStyle>
    ); 
}

export default Login; 