import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components' ;

const ConfirmStyle = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const OneCode = styled.input`
    width: 5vw;
    height: 7vw;
    border-radius: 8px;
    border: 1px solid #FF6A49;
    color:  #FF6A49;
    text-align:center;
    font-size: 30px;
`;

const CodeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 37vw;
`

const Confirmation = () => {
    return (
        <ConfirmStyle>
            <div className="text fortypx">Creating Your Account...</div>
            <div className="text">Please enter the 5-digit code sent to your email</div>
            <CodeContainer>
                <OneCode />
                <OneCode />
                <OneCode />
                <OneCode />
                <OneCode />
            </CodeContainer>
        </ConfirmStyle>
    )
}

export default Confirmation; 