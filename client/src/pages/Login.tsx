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
`

const LoginButton = styled.div`
    width: 20vw;
    background-color: #FF6A49;
    color: white;
    border-radius: 10px;
    margin-top: 30px;
    height: 8vh;
    text-align: center;
    font-family: Itim;
    font-size: 120%;
`;

const Login = () => {
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>("");

    return ( 
        <LoginStyle> 
            <div className="text fortypx">Login</div>
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} login={true} />
            <LoginButton>Login</LoginButton>
        </LoginStyle>
    ); 
}

export default Login; 