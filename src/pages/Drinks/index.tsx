import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDrinks } from '../../hooks/drinks';

import Loading from '../../components/Loading/LoadingCenter';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Drink from '../../components/Drink';

const renderItem: React.FC = ({
  item: { idDrink, strDrink, strDrinkThumb },
  index,
}) => {
  return (
    <Drink
      idDrink={idDrink}
      strDrink={strDrink}
      strDrinkThumb={strDrinkThumb}
      onPressDrink={() => {
        // navigate('Detail')
      }}
    />
  );
};

const Drinks: React.FC = () => {
  const { navigate } = useNavigation();
  const { loading, drinks, onSearchDrinks } = useDrinks();

  return (
    <>
      <Header
        text="Drinks"
        showButtonBack
        onPressBack={() => {
          navigate('Categories');
        }}
      />
      <Search
        placeholder="Search"
        onChangeText={(text: string) => {
          if (loading) return;
          onSearchDrinks(text);
        }}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={drinks}
          keyExtractor={drink => String(drink.idDrink)}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            paddingBottom: 20,
          }}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

export default Drinks;
