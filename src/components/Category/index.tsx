import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Title } from './styles';

interface ICategory {
  name: string;
  onPress(name: string): void;
}

const Category: React.FC<ICategory> = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(name)} activeOpacity={0.9}>
      <Container style={{ elevation: 1 }}>
        <Title>{name}</Title>
      </Container>
    </TouchableOpacity>
  );
};

export default Category;
