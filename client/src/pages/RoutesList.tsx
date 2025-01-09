import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import axios from 'axios';
import styled from 'styled-components';


const RoutesList = () => {

    const userEmail = useSelector((state: RootState) => state.email);
    const user = userEmail.slice(0, userEmail.indexOf("@"));

    useEffect(() => {
        
        }, []);

    return (
        <>
            <div className="text fortypx">Welcome Back, {user}</div>
        </>
    )
}

export default RoutesList;