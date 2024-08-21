import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components' ;
import EmailInput from '../components/EmailInput'; 

const LoginStyle = styled.div`
    text-align: center;
`

const Login = () => {
    const [email, setEmail] = useState<string>(""); 

    return ( 
        <LoginStyle>
            <br />
            <br />
            <div className="text fortypx">Login</div>
            <EmailInput email={email} setEmail={setEmail} />
        </LoginStyle>
    ); 
}

export default Login; 