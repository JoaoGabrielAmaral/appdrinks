import React, { useState } from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDrinks } from '../../hooks/drinks';

import { Container, Title } from './styles';
import Loading from '../../components/Loading/LoadingCenter';
import Header from '../../components/Header';

const getIngredients = detail => {
  const items = [] as any[];

  Object.keys(detail).forEach(key => {
    if (key.startsWith('strIngredient') && detail[key]) {
      items.push(detail[key]);
    }
  });

  return items;
};

const renderItem: React.FC = ({ item }) => {
  const ingredients = getIngredients(item);
  return (
    <View>
      <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15 }}>
        {item.strDrink}
      </Text>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 15,
        }}
      >
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ height: 250, width: 250, borderWidth: 1 }}
        />
      </View>
      <Container>
        <Title>Ingredient</Title>
        {ingredients &&
          ingredients.map((ingredient, i) => (
            <Text style={{ color: '#fff', fontSize: 15 }}>
              {++i}
              {') '}
              {ingredient}
            </Text>
          ))}
      </Container>
      <Container>
        <Title>Instructions</Title>
        <Text style={{ color: '#fff', fontSize: 15 }}>
          {item.strInstructions}
        </Text>
      </Container>
    </View>
  );
};

const Detail: React.FC = () => {
  const { navigate } = useNavigation();
  const { loading, detail } = useDrinks();

  return (
    <View>
      <Header
        text="Details"
        showButtonBack
        onPressBack={() => navigate('Drinks')}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={detail}
          keyExtractor={d => String(d.idDrink)}
          ListFooterComponent={() => {
            return <View style={{ height: 50 }} />;
          }}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Detail;
