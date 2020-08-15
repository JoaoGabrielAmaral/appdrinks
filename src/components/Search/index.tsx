import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

// import { Container } from './styles';

interface ISearch {
  placeholder: string;
  onChangeText(text: string): void;
}

const Search: React.FC<ISearch> = ({ placeholder, onChangeText }) => {
  const [textSearch, setTextSearch] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 20,
        marginVertical: 50,
        elevation: 5,
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Icon name="search" size={25} color="#EB5757" />
      </View>
      <TextInput
        style={{ flex: 1, fontSize: 20 }}
        placeholder={placeholder}
        onChangeText={text => {
          setTextSearch(text);
          onChangeText(text);
        }}
        value={textSearch}
      />
    </View>
  );
};

export default Search;
