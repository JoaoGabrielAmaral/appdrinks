import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
