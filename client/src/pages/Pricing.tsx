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
    justify-content: space-between;
    text-align: center;
    width: 58vw;
`
const PriceSection = styled.div`
    text-align: center;
`
const PlanButton = styled.button`
    font-size: 15px;
    margin-top: 5vh;
`

const PriceBox = styled.div`
    border: 1px solid #FF6A49;
    color: #FF6A49;
    border-radius: 5px;
    text-align: left;
    width: 15vw;
    padding-right: 2vw;
    height:60vh;
`


const Pricing = () => {
    return (
        <PricingStyle>
            <div className="text fortypx">Pricing</div>
            <br />
            <PricesContainer>
                <PriceSection>
                    <div className="text twentypx">Free</div>
                    <br />
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
                    <br />
                    <PriceBox>
                        <ul><li>Unlimited attempts every month</li>
                            <br />
                            <li>Can input up to 15 locations</li>
                            <br />
                            <li>Allows options for walking, car, and bike</li>
                            <br />
                            <li>Comes with AI chatbot with limited input options</li></ul>
                    </PriceBox>
                </PriceSection>
                <PriceSection>
                    <div className="text twentypx">$10/month</div>
                    <br />
                    <PriceBox>
                        <ul><li>Unlimited attempts every month</li>
                            <br />
                            <li>Can input up to 20 locations</li>
                            <br />
                            <li>Allows options for any mode of travel</li>
                            <br />
                            <li>Comes with AI chatbot that further customizes the experience</li></ul>
                    </PriceBox>
                </PriceSection>
            </PricesContainer>
            <PlanButton>Choose a plan</PlanButton>
            <div className="text">Cancel anytime!</div>
        </PricingStyle>
    );
}

export default Pricing