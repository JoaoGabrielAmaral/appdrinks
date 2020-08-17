import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Container, Text } from './styles';

const Filter: React.FC = ({
  name,
  active,
  onPress,
}: {
  name: string;
  active: boolean;
  onPress(name: string): () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(name);
      }}
      activeOpacity={0.98}
    >
      <Container active={active}>
        <Text active={active}>{name}</Text>
      </Container>
    </TouchableOpacity>
  );
};

export default Filter;
