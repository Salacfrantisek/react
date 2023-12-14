import React, { useState } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const SwitchTrack = styled.div`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ isActive }) => (isActive ? '#4CAF50' : '#ccc')};
  display: flex;
  align-items: center;
  padding: 2px;
  box-sizing: border-box;
`;

const SwitchDot = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.3s ease;
  transform: translateX(${({ isActive }) => (isActive ? '30px' : '0')});
`;

const Switch = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleSwitch = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <SwitchContainer onClick={toggleSwitch}>
            <SwitchTrack isActive={isActive}>
                <SwitchDot isActive={isActive} />
            </SwitchTrack>
        </SwitchContainer>
    );
};

export default Switch;
