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
`;
const LocationStyle = styled.div`
    width: 15vw;
    font-size: 35px;
    color: #C32604;
`;
const ArrowStyle=styled.div`
width: 5vw;
    font-size: 35px;
    color: #C32604;
`

const LocationContainer = styled.div`
    display: flex;
    gap: 2vw;
    align-items: center;
    margin-top: 5vh;
    margin-bottom: 5vh;
`

const Results = () => {
    const location = useLocation();
    const {indexList, locationList, directions, totalTime} = location.state;
    const indices = indexList.map((index: number, i: number) => {
        
        if (i === indexList.length - 1) {
          return index.toString(); 
        } else {
          return index + "->"; 
        }
      });
      const locations: string[] = locationList.reduce((acc: string[], currentValue: string, index: number) => {
        acc.push(currentValue); 
        if (index < locationList.length - 1) { 
          acc.push("->"); 
        }
        return acc;
      }, []);
    return (
        <ResultsStyle>
            <div className="text fortypx">The Shortest Route We Found For You Is...</div>
            <div className="text fortypx">{indices}</div>
            <LocationContainer>
  {locations.map((location: string, index: number) => (
    location === "->" ? (
      <ArrowStyle key={index}>{location}</ArrowStyle>
    ) : (
      <LocationStyle key={index}>{location}</LocationStyle>
    )
  ))}
</LocationContainer>
            <button>Click Here to Download Directions</button>
            <div className="text twentypx">Estimated at {totalTime/3600 ? ( Math.floor(totalTime/3600) + " hours"): ""} {Math.floor(totalTime/60 - Math.floor(totalTime/3600)*60)} minutes</div>
        </ResultsStyle>
    )
}

export default Results;