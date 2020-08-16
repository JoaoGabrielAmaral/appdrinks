/* eslint-disable react/prop-types */
import React from 'react';
import { View } from 'react-native';
import { Loading } from '../styles';

interface Props {
  size?: number;
}

const LoadingCenter: React.FC<Props> = props => {
  const { size = 20 } = props;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Loading size={size} />
    </View>
  );
};

export default LoadingCenter;
