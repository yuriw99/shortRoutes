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

    &::placeholder {
    color: #FFB7A7;
    font-family: Itim;
}
`;

const EmailInput = ({email, setEmail}: EmailProps) => {
    return (
        <StyledInput value={email} placeholder="test1029@gmail.com" onChange={(e) => setEmail(e.target.value)} />
        
    );
}

export default EmailInput; 