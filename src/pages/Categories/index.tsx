import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { useDrinks } from '../../hooks/drinks';

import Search from '../../components/Search';
import Category from '../../components/Category';

const Categories: React.FC = () => {
  const { loading, categories, onFilterCategories } = useDrinks();

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          Categories
        </Text>
      </View>
      <Search
        placeholder="Search"
        onChangeText={(text: string) => {
          onFilterCategories(text);
        }}
      />
      <FlatList
        data={categories}
        keyExtractor={categorie => String(categorie)}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
          paddingBottom: 20,
        }}
        renderItem={({ item, index }) => {
          return (
            <Category
              key={index}
              name={item}
              onPress={(text: string) => {
                console.log(text);
              }}
            />
          );
        }}
      />
    </>
  );
};

export default Categories;
