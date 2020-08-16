import React, { useCallback } from 'react';
import { Text, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDrinks } from '../../hooks/drinks';

import Loading from '../../components/Loading/LoadingCenter';
import Header from '../../components/Header';
import Search from '../../components/Search';
import Drink from '../../components/Drink';

const renderItem: React.FC = (
  { item: { idDrink, strDrink, strDrinkThumb } },
  onPress,
) => {
  return (
    <Drink
      idDrink={idDrink}
      strDrink={strDrink}
      strDrinkThumb={strDrinkThumb}
      onPressDrink={() => onPress(idDrink)}
    />
  );
};

const Drinks: React.FC = () => {
  const { navigate } = useNavigation();
  const { loading, drinks, onSearchDrinks, getDetailDrink } = useDrinks();

  const onPress = useCallback(
    (idDrink: string) => {
      getDetailDrink(idDrink);
      navigate('Detail');
    },
    [getDetailDrink, navigate],
  );

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
          ListEmptyComponent={() => {
            return (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 15 }}>
                  No records found
                </Text>
              </View>
            );
          }}
          renderItem={item => renderItem(item, onPress)}
        />
      )}
    </>
  );
};

export default Drinks;
