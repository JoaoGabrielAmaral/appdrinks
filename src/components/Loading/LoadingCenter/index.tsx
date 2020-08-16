import React from 'react';
import { Container, Loading } from '../styles';

interface Props {
  size?: number;
}

const LoadingCenter: React.FC<Props> = props => {
  const { size = 20 } = props;

  return (
    <Container>
      <Loading size={size} />
    </Container>
  );
};

export default LoadingCenter;
