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
    const email = useSelector((state: RootState) => state.email);
    const navigate = useNavigate();

    const logout = () => {
        const dispatch = useDispatch<AppDispatch>();
        dispatch(setAllPagePassword('initial password'));
        dispatch(setAllPageEmail('initial email'));
    }
    
    return (
        <HeadStyle>
            <ElementFlex>
                <Logo onClick={() => navigate("/")}>ShortRoutes <img src={Car} alt="Car" /></Logo>
                <Element onClick={() => navigate("/careers")}>
                    Careers
                </Element>
                <Element onClick={() => navigate("/pricing")}>
                    Pricing
                </Element>
                { email=='initial email' ? (
                <Element onClick={() => navigate("/login")}>
                    Login/Sign Up
                </Element>) : ( 
                    <Element onClick={logout}>
                        Logout
                    </Element>
                )
}
            </ElementFlex>
        </HeadStyle>
    )
}

export default Header; 