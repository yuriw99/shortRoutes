import React, { useState } from 'react';
import styled from 'styled-components';
import html2pdf from 'html2pdf.js';
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
const ArrowStyle = styled.div`
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
    const { indexList, locationList, directions, totalTime } = location.state;
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

    const generatePDF = () => {
        let dynamicContent = '';

        for (let i = 0; i < locationList.length - 1; i++) {
          dynamicContent += `
            <h3>From ${locationList[i]} to ${locationList[i + 1]}</h3>
            <ul>
          `;
          for (let j=0; j < directions[i].length; j ++){
          dynamicContent += `<li> ${j} . ${directions[i][j].instruction} </li>`
          console.log(directions[i][j])
        }
    
          dynamicContent += '</ul> <br/>';
        }
    
        const pdfContent = `
          <div>
            <h1 style="text-align: center">Instructions</h1>
            ${dynamicContent}
          </div>
        `;
    
        const tempElement = document.createElement('div');
        tempElement.innerHTML = pdfContent;
    
        
        html2pdf()
          .from(tempElement)
          .save('instructions.pdf')
          .then(() => {
            
          });
      };
    

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
            <button onClick={generatePDF}>Click Here to Download Directions</button>
            <div className="text twentypx">Estimated at {Math.floor(totalTime / 3600) ? (Math.floor(totalTime / 3600) + " hours") : ""} {Math.floor(totalTime / 60 - Math.floor(totalTime / 3600) * 60)} minutes</div>
        </ResultsStyle>
    )
}

export default Results;