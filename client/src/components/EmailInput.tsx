import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components' ;

interface EmailProps {
    email: string;
    setEmail: Function; 
}

const StyledInput = styled.input`
    color: #FF6A49;
    font-family: Itim;
    border-radius: 5px; 
    border: 1.5px solid #FF6A49;
    padding-left: 15px;
    width: 40vw; 
    height: 7vh; 
    font-size: 1em;

    &::placeholder {
    color: #FFB7A7;
    font-family: Itim;
    font-size: 1.1em; 

}
`;

const EmailContainer = styled.div`
    padding-top: 30px;
    width: 40vw; 
`

const EmailText = styled.div`
    text-align: left; 
    color: #FF6A49;
    font-family: Itim;
`

const EmailInput = ({email, setEmail}: EmailProps) => {
    return (
        <EmailContainer>
            <EmailText>Email</EmailText>
        <StyledInput value={email} placeholder="test1029@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        </EmailContainer>
    );
}

export default EmailInput; 