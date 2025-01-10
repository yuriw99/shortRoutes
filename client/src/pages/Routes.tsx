import React, { useState } from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import BounceLoader from "react-spinners/BounceLoader";
import axios from 'axios';
import 'react-dropdown/style.css';
import './Dropdown.css';

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
    &:focus {
    border: 1px solid #C32604; 
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
`;

const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2; 
    background-color: rgba(0, 0, 0, 0.75); 
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface Option {
    label: string;
    value: string;
}

const FindRoutes = () => {
    const [numLocations, setNumLocations] = useState(0);
    const [locations, setLocations] = useState<string[]>(["empty location"]);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);
    const userEmail = useSelector((state: RootState) => state.email);
    const navigate = useNavigate();

    const options: Option[] = [
        { label: 'Walking', value: 'walking' },
        { label: 'Car', value: 'car' },
        { label: 'Bus', value: 'bus' },
    ];

    const inputLocation = (newLocation: string, index: number) => {
        const updatedLocations = [
            ...locations.slice(0, index),
            newLocation,
            ...locations.slice(index + 1)
        ];
        setLocations(updatedLocations);
    }

    const handleSelect = (option: { value: string }, index: number) => {
        const newOption: Option = {
            value: option.value,
            label: option.value
        }
        const updatedOptions = [
            ...selectedOptions.slice(0, index),
            newOption,
            ...selectedOptions.slice(index + 1),
        ];
        setSelectedOptions(updatedOptions);
    };

    const calculateRoute = async () => {
        try {
            setLoading(true);
            const transportList = selectedOptions.map((option) => option.label);
            const response = await axios.post('http://localhost:5000/api/find-shortest-route', { userEmail, locations, transportList });
            setLoading(false);
            navigate("/results", { state: { indexList: response.data.indices, locationList: response.data.locations, directions: response.data.directions, totalTime: response.data.totalTime } });
        } catch (error) {
            setLoading(false);
            alert("Cannot connect. Please try again")
            console.error(error);
        }
    }

    const addALocation = () => {
        if (numLocations < 10) {
            setNumLocations(numLocations + 1);
            const newOption: Option = {
                value: 'walking',
                label: 'Walking'
            };
            setSelectedOptions(
                [...selectedOptions, newOption]
            );
            setLocations(
                [...locations, "empty location"]
            );
        }

    }

    return (
        <>
            <LocationStyle>
                <div className="text">Starting Location</div>
                <StyledInput placeholder="100 Church St New York, NY" onChange={(e) => inputLocation(e.target.value, 0)} />
            </LocationStyle>
            {Array.from({ length: numLocations }, (_, index) => (
                <LocationStyle key={index}>
                    <div className="text">Location {index + 1}</div>
                    <StyledInput placeholder="100 Church St New York, NY" onChange={(e) => inputLocation(e.target.value, index + 1)} />
                    <Dropdown
                        controlClassName='myControlClassName'
                        menuClassName='myMenuClassName'
                        arrowClassName='myArrowClassName'
                        options={options.map((opt) => opt.label)}
                        onChange={(selectedOption) => handleSelect(selectedOption, index)}
                        value={selectedOptions[index] || 'Walking'}
                    />
                </LocationStyle>
            ))}
            <ButtonContainer>
                <LocationButton onClick={addALocation}>+</LocationButton>
            </ButtonContainer>
            <ButtonContainer> <button className="twentypx margintop" onClick={calculateRoute}>Submit Routes</button></ButtonContainer>
            {
                loading ? (
                    <LoadingOverlay>
                        <div className="text fortypx marginbottom">Calculating Routes...</div>
                        <BounceLoader
                            color="#C32604"
                            loading={loading}
                            size={100}
                            aria-label="Loading Spinner"
                            data-testid="loader" />
                            <div className="text twentypx margintop">This can take ~1 minute...</div>
                    </LoadingOverlay>) : <></>
            }
        </>
    )
}

export default FindRoutes;
