import React from 'react';
import styled from 'styled-components' ;

const Element = styled.div`
`; 

const ElementFlex = styled.div`

`; 

const Logo = styled.div`

`;

const HeadStyle = styled.div`

`;

const Header = () => {
    return (
        <HeadStyle>
            <Logo>ShortRoutes</Logo>
            <ElementFlex>
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