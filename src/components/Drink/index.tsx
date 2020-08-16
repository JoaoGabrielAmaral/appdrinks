import React from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  Container,
  ContainerImage,
  ContainerTitle,
  Title,
  ContainerIcon,
  IconDetail,
} from './styles';

const Drink: React.FC = ({
  idDrink,
  strDrink,
  strDrinkThumb,
  onPressDrink,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressDrink}
      activeOpacity={0.95}
      style={{ elevation: 5 }}
    >
      <Container>
        <ContainerImage>
          <Image
            source={{
              uri: strDrinkThumb,
            }}
            style={{ height: 100, width: 100, borderRadius: 10 }}
            resizeMode="center"
          />
        </ContainerImage>
        <ContainerTitle>
          <Title>{strDrink}</Title>
        </ContainerTitle>
        <ContainerIcon>
          <IconDetail />
        </ContainerIcon>
      </Container>
    </TouchableOpacity>
  );
};

export default Drink;
