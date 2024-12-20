import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from "react-router-dom";
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
`;

const Confirmation: React.FC = () => {
    const [values, setValues] = useState<string[]>(new Array(5).fill(''));
    const inputRefs = useRef<HTMLInputElement[]>([]);
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
        </ConfirmStyle>
    );
};

export default Confirmation;
