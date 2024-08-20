import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components' ;
import Girl from '../images/Girl.png'; 

const MainPageStyle = styled.div`
    display: flex;
    padding: 15vh 8vw 0vh 8vw;
    gap: 5vw;
`;

const GirlMap = styled.img`
    width: 33vw; 
`;


const MainText = styled.div`
    text-align: center;
`


const MainPage = () => {
    const navigate = useNavigate(); 

    return (
        <MainPageStyle>
            <GirlMap src={Girl} alt="Girl looking at map" />
            <MainText>
                <br />
                <div className="text fortypx">
                    Plan out your routes to get to your destinations in the shortest time!
                </div>
                <div className="text twentypx">
                Input up to 10 locations for the fastest way to get to all of them
                </div>
                <br /> <br /> 
                <button className="twentypx" onClick={() => navigate("/findRoutes")}>Try for Free</button>
            </MainText>
        </MainPageStyle>
    );
}

export default MainPage; 