import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { ContainerIcon, IconBack } from './styles';

interface IButtonBack {
  onPressBack: () => void;
}
const ButtonBack: React.FC<IButtonBack> = ({ onPressBack }) => {
  return (
    <View
      style={{
        position: 'absolute',
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (onPressBack) onPressBack();
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ContainerIcon>
          <IconBack name="arrow-left" />
        </ContainerIcon>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBack;
