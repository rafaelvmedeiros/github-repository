import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
    from {
      transform: rotate(0);
    }
    to {
     transform: rotate(360deg);
    }
`;

export const Wrapper = styled.div`
   flex: 1;
   display: flex;
   justify-content: center;
   align-items: center;

   svg {
    animation: ${rotate} 1.6s linear infinite;
   }

   > p {
     font-size: 14px;
     color: #3a3a4a;
     margin-left: 10px;
   }
`;
