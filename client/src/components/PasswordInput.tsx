import React from 'react';
import styled from 'styled-components';

interface PasswordProps {
    password: string;
    setPassword: Function;
    login: Boolean;
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

const PasswordContainer = styled.div`
    padding-top: 30px;
    width: 40vw; 
`

const PasswordText = styled.div`
    text-align: left; 
    color: #FF6A49;
    font-family: Itim;
`

const PasswordInput = ({ password, setPassword, login }: PasswordProps) => {
    return (
        <PasswordContainer>
            <PasswordText>Password</PasswordText>
            <StyledInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            {!login ? <PasswordText>Must be between 10-15 characters, at least one special character and digit</PasswordText>
                : <PasswordText>Forgot your password? <u>Click here</u></PasswordText>
            }
        </PasswordContainer>
    );
}

export default PasswordInput; 