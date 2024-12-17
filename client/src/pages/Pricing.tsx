import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const PricingStyle = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PricesContainer = styled.div`
    display: flex;
    gap: 2%;
    text-align: center;
    width: 70vw;
`
const PriceSection = styled.div`
    text-align: center;
`


const PriceBox = styled.div`
    border: 1px solid #FF6A49;
    color: #FF6A49;
    border-radius: 5px;
    text-align: left;
    width: 20vw;
    height:60vh;
`


const Pricing = () => {
    return (
        <PricingStyle>
            <div className="text fortypx">Pricing</div>
            <PricesContainer>
                <PriceSection>
                    <div className="text twentypx">Free</div>
                <PriceBox>
                    <ul><li>10 free attempts every month</li>
                    <br />
                        <li>Can input up to 10 locations</li>
                        <br />
                        <li>Allows options for walking, car, and bike</li>
                        <br />
                        <li>Comes with no AI tools</li></ul>
                </PriceBox>
                </PriceSection>
                <PriceSection>
                <div className="text twentypx">$5/month</div>
                <PriceBox>
                    <ul><li>Unlimited attempts every month</li>
                    <li>Can input up to 15 locations</li>
                    <li>Allows options for walking, car, and bike</li>
                    <li>Comes with AI chatbot with limited input options</li></ul>
                </PriceBox>
                </PriceSection>
                <PriceSection>
                <div className="text twentypx">$10/month</div>
                <PriceBox>
                <ul><li>Unlimited attempts every month</li>
                    <li>Can input up to 20 locations</li>
                    <li>Allows options for any mode of travel</li>
                    <li>Comes with AI chatbot that further customizes the experience</li></ul>
                </PriceBox>
                </PriceSection>
            </PricesContainer>
        </PricingStyle>
    );
}

export default Pricing