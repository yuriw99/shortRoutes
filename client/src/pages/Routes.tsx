import React, {useState} from 'react';
import styled from 'styled-components';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Routes } from 'react-router-dom';


const LocationStyle = styled.div`
    display: flex;
`;

const StyledInput = styled.input`
    color: #FF6A49;
    font-family: Itim;
    border-radius: 5px; 
    border: 1px solid #FF6A49;
    padding-left: 10px;
    width: 15vw; 
    height: 2vh; 
    font-size: 1em;

    &::placeholder {
    color: #FFB7A7;
    font-family: Itim;
    font-size: 1.1em; 

}
`;


const LocationButton = styled.div`
    border-radius: 50%;
    border: 1px solid #FF6A49;
    background-color: white;
    color: #FF6A49;
`;

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
        {Array.from({ length: numLocations }, (_, index) => (
                <LocationStyle key={index}>
                    <div className="text">Location {index + 1}</div>
                    <StyledInput />
                    <Dropdown
                    options={options.map((opt) => opt.label)} 
                    onChange={handleSelect}  
                    value={selectedOption?.label || 'Walking'}  
                    />
                </LocationStyle>
            ))}
        <LocationButton onClick={()=> setNumLocations(numLocations + 1)}>+</LocationButton>
        </>
    )
}

export default FindRoutes;
