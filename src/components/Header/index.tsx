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
        <ContainerIcon>
          <TouchableOpacity
            onPress={() => {
              if (onPressBack) onPressBack();
            }}
            style={{
              height: 25,
              width: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconBack name="arrow-left" />
          </TouchableOpacity>
        </ContainerIcon>
      )}
      <ContainerTitle>
        <Title>{text}</Title>
      </ContainerTitle>
    </>
  );
};

export default Header;
