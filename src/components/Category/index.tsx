import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// import { Container } from './styles';

interface ICategory {
  name: string;
  onPress(name: string): void;
}

const Category: React.FC<ICategory> = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(name)} activeOpacity={0.9}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 15,
          width: 180,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 1,
        }}
      >
        <Text style={{ fontSize: 15 }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Category;
