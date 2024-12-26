import React from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setAllPageEmail, setAllPagePassword } from '../redux/reducers';
import styled from 'styled-components';
import Car from '../images/Car.svg';


const Element = styled.div`
    font-family: Itim;
    font-size: 20px; 
    color: white;
`;

const HeaderFlex = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ElementFlex = styled.div`
    display: flex;
    align-items: center;
    gap: 5vw;
    padding-right: 2vw;
`;

const Logo = styled.div`
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
    const email = useSelector((state: RootState) => state.email);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const logout = () => {
        dispatch(setAllPagePassword('initial password'));
        dispatch(setAllPageEmail('initial email'));
    }

    return (
        <HeadStyle>
            <HeaderFlex>
                <Logo onClick={() => navigate("/")}>ShortRoutes <img src={Car} alt="Car" /></Logo>
                <ElementFlex>
                <Element onClick={() => navigate("/careers")}>
                    Careers
                </Element>
                <Element onClick={() => navigate("/pricing")}>
                    Pricing
                </Element>
                { email==='initial email' ? (
                <Element onClick={() => navigate("/login")}>
                    Login/Sign Up
                </Element>) : ( <>
                    <Element> MyRoutes </Element>
                    <Element onClick={logout}>
                        Logout
                    </Element></>
                ) 
}</ElementFlex>
            </HeaderFlex>
        </HeadStyle>
    )
}

export default Header; 