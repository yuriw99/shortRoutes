import React from 'react';
import styled from 'styled-components' ;


const Element = styled.div`
`; 

const ElementFlex = styled.div`
    display: flex;
    gap: 5vw;
`; 

const Logo = styled.div`
    padding-right: 60vw;
    font-size: 35px;
    font-family: Kalam;
`;

const HeadStyle = styled.div`
    background-color: #FF6A49;

`;

const Header = () => {
    return (
        <HeadStyle>
            <ElementFlex>
            <Logo>ShortRoutes</Logo>
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