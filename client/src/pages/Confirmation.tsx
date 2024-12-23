import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ConfirmStyle = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const OneCode = styled.input`
    width: 5vw;
    height: 7vw;
    border-radius: 8px;
    border: 1px solid #FF6A49;
    color: #FF6A49;
    text-align: center;
    font-size: 30px;
`;

const CodeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 37vw;
    margin-top: 7vh;
`;

const ErrorMessage = styled.div`
    border: 1px solid #eb4034;
    padding: 10px;
    color: #eb4034;
    background-color: #f2d1ce;
    margin-top: 5vh;
   
`

const Confirmation: React.FC = () => {
    const [values, setValues] = useState<string[]>(new Array(5).fill(''));
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [errorText, setErrorText] = useState<string>("");
    const location = useLocation();
    const { code } = location.state || {};
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        // Ensure only digits are entered
        if (!/^\d*$/.test(value)) return;

        const newValues = [...values];
        newValues[index] = value.slice(-1); // Keep only the last digit
        setValues(newValues);

        // Move to the next input if a digit is entered
        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }

        // If all boxes are filled, trigger a navigation or API call
        if (newValues.every((v) => v !== '')) {
            const codeArray = Array.from(String(code));
            if (newValues.every((value, index) => value === codeArray[index])) {
                navigate("/success");
            }
            else {
                console.log("not the correct code!");
                //console.log("correct code is", codeArray);
                //console.log("incorrect code is", newValues);
                setErrorText("Please enter the correct code")
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            const newValues = [...values];
            newValues[index] = '';
            setValues(newValues);

            // Move to the previous input if Backspace is pressed
            if (index > 0 && values[index] === '') {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, 5);
        const newValues = pasteData.split('').map((char) => (/^\d$/.test(char) ? char : ''));
        setValues(newValues);

        // Focus the appropriate input box based on the pasted data
        newValues.forEach((char, i) => {
            if (char && inputRefs.current[i]) {
                inputRefs.current[i].focus();
            }
        });

        // Check if verification code matches. If it does, then go to success page
        if (newValues.every((v) => v !== '')) {
            const codeArray = Array.from(String(code));
            if (newValues.every((value, index) => value === codeArray[index])) {
                navigate("/success");
            }
            else {
                console.log("not the correct code!");
                //console.log("correct code is", codeArray);
                //console.log("incorrect code is", newValues);
                setErrorText("Please enter the correct code")
            }
        }
    };

    return (
        <ConfirmStyle>
            <div className="text fortypx">Creating Your Account...</div>
            <div className="text">Please enter the 5-digit code sent to your email</div>
            <CodeContainer>
                {values.map((_, index) => (
                    <OneCode
                        key={index}
                        ref={(el) => {
                            if (el) inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={values[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                    />
                ))}
            </CodeContainer>
            {errorText ? <ErrorMessage>
                <span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="#FF4C4C" />
                        <line x1="12" y1="7" x2="12" y2="14" stroke="#FFFFFF" stroke-width="2" />
                        <circle cx="12" cy="17" r="1.5" fill="#FFFFFF" />
                    </svg></span>
                {errorText}
            </ErrorMessage> : <div />}
        </ConfirmStyle>
    );
};

export default Confirmation;
