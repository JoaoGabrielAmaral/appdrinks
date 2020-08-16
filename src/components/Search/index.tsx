import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ContainerIcon, Input } from './styles';

interface ISearch {
  placeholder: string;
  onChangeText(text: string): void;
}

const Search: React.FC<ISearch> = ({ placeholder, onChangeText }) => {
  const [textSearch, setTextSearch] = useState('');

  return (
    <Container style={{ elevation: 5 }}>
      <ContainerIcon>
        <Icon name="search" size={25} color="#EB5757" />
      </ContainerIcon>
      <Input
        placeholder={placeholder}
        onChangeText={text => {
          setTextSearch(text);
          onChangeText(text);
        }}
        value={textSearch}
      />
      {!!textSearch.length && (
        <TouchableOpacity
          onPress={() => {
            setTextSearch('');
            onChangeText('');
          }}
        >
          <ContainerIcon>
            <Icon name="x" size={25} color="#EB5757" />
          </ContainerIcon>
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default Search;
