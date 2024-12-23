import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const CareersStyle = styled.div`    
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5vh;
    `;

const Careers = () => {
    return (
        <CareersStyle>
            <div className="text fortypx">Internships</div>
            <div className="text">There are currently no internship opportunities. Please come back
                at another time :(
            </div>
        </CareersStyle>
    )
}

export default Careers; 