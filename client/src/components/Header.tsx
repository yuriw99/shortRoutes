import React from 'react';
import styled from 'styled-components' ;
import Car from '../images/Car.svg'; 


const Element = styled.div`
    font-family: Itim;
    font-size: 20px; 
    color: white;
`; 

const ElementFlex = styled.div`
    display: flex;
    align-items: center;
    gap: 5vw;
`; 

const Logo = styled.div`
    padding-right: 45vw;
    padding-left: 2vw;
    font-size: 32px;
    font-family: Kalam;
    color: white;
    display: flex; 
    gap: 1vw;
`;

const HeadStyle = styled.div`
    background-color: #FF6A49;

`;

const Header = () => {
    return (
        <HeadStyle>
            <ElementFlex>
            <Logo>ShortRoutes <img src={Car} alt="Car" /></Logo>
                <Element>
                    Careers
                </Element>
                <Element>
                    Pricing
                </Element>
                <Element>
                    Login/Sign Up
                </Element>
            </ElementFlex>
        </HeadStyle>
    )
}

export default Header; 