import React, {useEffect, useState, CSSProperties} from 'react';
import axios from 'axios';
import {  useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components' ;
import ClipLoader from "react-spinners/ClipLoader";
import {  RootState } from '../redux/store';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#C32604",
  };

const SuccessStyle = styled.div`    
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    `;

const ConfirmSuccess = () => {

    const email = useSelector((state: RootState) => state.email);
    const password = useSelector((state: RootState) => state.password);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const addUsertoDatabase = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/add-new-user', { email, password });
            setLoading(false);
            navigate("/"); 
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
            addUsertoDatabase();
    }, []);

    return (
        <SuccessStyle>
            <div className="text fortypx">Account Creation Successful ✅</div>
            <ClipLoader
        color="#C32604"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
            <div className="text">Wait to be redirected back to home page..</div>
        </SuccessStyle>
    )
}

export default ConfirmSuccess; 