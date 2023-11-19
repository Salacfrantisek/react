import { keyframes } from 'styled-components';

// Definice animace
export const moveUp = keyframes`
  from {
    transform: translateY(50px);
  }
  to {
    transform: translateY(0);
  }
`;
