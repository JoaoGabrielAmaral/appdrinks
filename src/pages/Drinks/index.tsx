import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container, Title, ContainerFlatList } from './styles';

import { useDrinks } from '../../hooks/drinks';

import Loading from '../../components/Loading/LoadingCenter';
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
      <Search
        placeholder="Search"
        onChangeText={(text: string) => {
          if (loading) return;
          onSearchDrinks(text);
        }}
      />
      <ContainerFlatList>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={drinks}
            keyExtractor={drink => String(drink.idDrink)}
            style={{ marginTop: 2 }}
            ListEmptyComponent={() => {
              return (
                <Container>
                  <Title>No records found</Title>
                </Container>
              );
            }}
            renderItem={item => renderItem(item, onPress)}
          />
        )}
      </ContainerFlatList>
    </>
  );
};

export default Drinks;
