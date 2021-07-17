import React from 'react';

import { FaSpinner } from 'react-icons/fa';

import { Wrapper } from './styles';

const Loading: React.FC = () => (
  <Wrapper>
    <FaSpinner size="40 " color="#3a3a4a" />
    <p>Aguarde, Carregando...</p>
  </Wrapper>
);

export default Loading;
