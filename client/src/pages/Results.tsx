import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const ResultsStyle = styled.div`
    text-align: center;
    display: flex;
     flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5vh; 
`

const Results = () => {
    const location = useLocation();
    const {indexList, locationList, directions, totalTime} = location.state;
    return (
        <ResultsStyle>
            <div className="text fortypx">The Shortest Route We Found For You Is...</div>
            <button>Click Here to Download Directions</button>
            <div className="text twentypx">Estimated at {totalTime} minutes</div>
        </ResultsStyle>
    )
}

export default Results;