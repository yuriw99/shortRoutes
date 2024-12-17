import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const PricingStyle = styled.div`
    text-align: center;
`;

const PricesContainer = styled.div`
    display: flex;
    gap: 20%;
    text-align: center;
`

const PriceBox = styled.div`
    border: 1px solid #FF6A49;
    color: #FF6A49;
    border-radius: 5px;
`


const Pricing = () => {
    return (
        <PricingStyle>
            <div className="text fortypx">Pricing</div>
            <PricesContainer>
                <PriceBox>
                    <ul><li>10 free attempts every month</li>
                        <li>Can input up to 10 locations</li>
                        <li>Allows options for walking, car, and bike</li>
                        <li>Comes with no AI tools</li></ul>
                </PriceBox>
                <PriceBox>

                </PriceBox>
                <PriceBox>

                </PriceBox>
            </PricesContainer>
        </PricingStyle>
    );
}

export default Pricing