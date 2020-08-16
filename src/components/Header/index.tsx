import React from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { ContainerIcon, IconBack, ContainerTitle, Title } from './styles';

interface IHeader {
  text: string;
  showButtonBack?: boolean;
  onPressBack?(): void;
}

const Header: React.FC<IHeader> = ({ text, showButtonBack, onPressBack }) => {
  return (
    <>
      {showButtonBack && (
        <TouchableOpacity
          onPress={() => {
            if (onPressBack) onPressBack();
          }}
          style={{ height: 50, width: 50 }}
        >
          <ContainerIcon>
            <IconBack name="arrow-left" />
          </ContainerIcon>
        </TouchableOpacity>
      )}
      <ContainerTitle>
        <Title>{text}</Title>
      </ContainerTitle>
    </>
  );
};

export default Header;
