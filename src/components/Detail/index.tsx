import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

const Detail: React.FC = ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
      {children}
    </View>
  );
};

export default Detail;
