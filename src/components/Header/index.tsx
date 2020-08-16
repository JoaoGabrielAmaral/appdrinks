import React from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import ButtonBack from '../ButtonBack';

import { ContainerTitle, Title } from './styles';

interface IHeader {
  text: string;
  showButtonBack?: boolean;
  onPressBack?(): void;
}

const Header: React.FC<IHeader> = ({
  text,
  showButtonBack,
  onPressBack,
}: {
  text: string;
  showButtonBack: boolean;
  onPressBack: () => void;
}) => {
  return (
    <>
      {showButtonBack && <ButtonBack onPressBack={onPressBack} />}
      <ContainerTitle>
        <Title>{text}</Title>
      </ContainerTitle>
    </>
  );
};

export default Header;
