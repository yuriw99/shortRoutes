import React, { useEffect, useState, CSSProperties } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import ClipLoader from "react-spinners/ClipLoader";
import { RootState } from '../redux/store';

const override: CSSProperties = {

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

    const sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const addUsertoDatabase = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/add-new-user', { email, password }, {withCredentials: true});
            await sleep(3000);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        addUsertoDatabase();
        console.log("useEffect is called")
    }, []);

    return (
        <SuccessStyle>
            <div className="text fortypx marginbottom">Account Creation Successful ✅</div>
            <ClipLoader
                color="#C32604"
                loading={loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <div className="text twentypx margintop">Wait to be redirected back to home page..</div>
        </SuccessStyle>
    )
}

export default ConfirmSuccess; 