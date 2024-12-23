import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const LocationStyle = styled.div`
    display: flex;
    gap: 7vw;
    margin-left: 4vw;
    margin-bottom: 5vh;
`;

const StyledInput = styled.input`
    color: #FF6A49;
    font-family: Itim;
    border-radius: 5px; 
    border: 1px solid #FF6A49;
    padding-left: 10px;
    width: 15vw; 
    height: 5vh; 
    font-size: 1em;
    margin-top: 10px;

    &::placeholder {
    color: #FFB7A7;
    font-family: Itim;
    font-size: 1em; 

}
`;


const LocationButton = styled.div`
    border-radius: 50%;
    border: 1px solid #FF6A49;
    background-color: white;
    color: #FF6A49;
    width: 67px;
    height: 45px;
    text-align: center;
    font-size: 50px;
    padding-bottom: 24px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

interface Option {
    label: string;
    value: string;
}

const FindRoutes = () => {
    const [numLocations, setNumLocations] = useState(0);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const options: Option[] = [
        { label: 'Walking', value: 'walking' },
        { label: 'Car', value: 'car' },
        { label: 'Bus', value: 'bus' },
    ];

    const handleSelect = (option: { value: string }) => {
        setSelectedOption({
            label: option.value,
            value: option.value,
        });
    };

    return (
        <>
            <LocationStyle>
                <div className="text">Starting Location</div>
                <StyledInput placeholder="100 Church St" />
            </LocationStyle>
            {Array.from({ length: numLocations }, (_, index) => (
                <LocationStyle key={index}>
                    <div className="text">Location {index + 1}</div>
                    <StyledInput placeholder="100 Church St" />
                    <Dropdown
                        options={options.map((opt) => opt.label)}
                        onChange={handleSelect}
                        value={selectedOption?.label || 'Walking'}
                    />
                </LocationStyle>
            ))}
            <ButtonContainer>
                <LocationButton onClick={() => setNumLocations(numLocations + 1)}>+</LocationButton>
            </ButtonContainer>
        </>
    )
}

export default FindRoutes;
