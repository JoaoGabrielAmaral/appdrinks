import React from 'react';

import { Container, Button, ContainerIcon, IconBack } from './styles';

interface IButtonBack {
  onPressBack: () => void;
}

const ButtonBack: React.FC<IButtonBack> = ({ onPressBack }) => {
  return (
    <Container>
      <Button
        onPress={() => {
          if (onPressBack) onPressBack();
        }}
      >
        <ContainerIcon>
          <IconBack name="arrow-left" />
        </ContainerIcon>
      </Button>
    </Container>
  );
};

export default ButtonBack;
