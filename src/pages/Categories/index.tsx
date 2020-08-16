import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDrinks } from '../../hooks/drinks';

import Loading from '../../components/Loading/LoadingCenter';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Category from '../../components/Category';

const renderItem: React.FC = (item, onPress) => {
  return <Category name={item} onPress={onPress} />;
};

const Categories: React.FC = () => {
  const { navigate } = useNavigation();
  const { loading, categories, onSearchCategories, getDrinks } = useDrinks();

  const onPress = useCallback(
    (text: string) => {
      getDrinks(text);
      navigate('Drinks');
    },
    [getDrinks, navigate],
  );

  return (
    <>
      <Header text="Categories" />
      <Search
        placeholder="Search"
        onChangeText={(text: string) => {
          if (loading) return;
          onSearchCategories(text);
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={categorie => String(categorie)}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            paddingBottom: 20,
          }}
          renderItem={({ item }) => renderItem(item, onPress)}
        />
      )}
    </>
  );
};

export default Categories;
