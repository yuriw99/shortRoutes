import React, { useState } from 'react';
import styled from 'styled-components';
import EmailInput from '../components/EmailInput';

const ForgetPasswordStyle = styled.div`
`

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    return (
        <ForgetPasswordStyle>
            <EmailInput email={email} setEmail={setEmail} />
        </ForgetPasswordStyle>
    );

}

export default ForgetPassword; 