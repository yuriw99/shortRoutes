import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components' ;

const SuccessStyle = styled.div`    
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

const ConfirmSuccess = () => {
    return (
        <SuccessStyle>
            <div className="text fortypx">Account Creation Successful ✅</div>
            <div className="text">Wait to be redirected back to home page..</div>
        </SuccessStyle>
    )
}

export default ConfirmSuccess; 