import React, { useCallback, useRef } from 'react';
import { View, FlatList, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  Container,
  ContainerItem,
  Item,
  FilterName,
  NoRecords,
} from './styles';
import { useDrinks } from '../../hooks/drinks';

import Loading from '../../components/Loading/LoadingCenter';
import Header from '../../components/Header';
import Search from '../../components/Search';

const HEIGHT_ITEM = 80;
const { width } = Dimensions.get('window');

const renderItem = ({ item }: any, typeFilter: string, onPress) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(typeFilter, item)}
    >
      <ContainerItem height={HEIGHT_ITEM}>
        <Item>{item}</Item>
      </ContainerItem>
    </TouchableOpacity>
  );
};

const Filters: React.FC = () => {
  const { navigate } = useNavigation();
  const flatListCategoriesRef = useRef(null);
  const flatListGlassesRef = useRef(null);
  const flatListIngredientsRef = useRef(null);
  const flatListAlcoholicRef = useRef(null);

  const {
    loadingCategories,
    categories,
    loadingGlasses,
    glasses,
    loadingIngredients,
    ingredients,
    loadingAlcoholic,
    alcoholic,
    onSearchFilters,
    onFilter,
  } = useDrinks();

  const filters = [
    {
      name: 'Categories',
      loading: loadingCategories,
      content: categories,
      flatListRef: flatListCategoriesRef,
    },
    {
      name: 'Glasses',
      loading: loadingGlasses,
      content: glasses,
      flatListRef: flatListGlassesRef,
    },
    {
      name: 'Ingredients',
      loading: loadingIngredients,
      content: ingredients,
      flatListRef: flatListIngredientsRef,
    },
    {
      name: 'Alcoholic',
      loading: loadingAlcoholic,
      content: alcoholic,
      flatListRef: flatListAlcoholicRef,
    },
  ];

  const onPress = useCallback(
    (typeFilter: string, nameFilter: string) => {
      onFilter(typeFilter, nameFilter);
      navigate('Drinks');
    },
    [onFilter, navigate],
  );

  return (
    <>
      <Header text="Filters" />
      <Search
        placeholder="Search"
        onChangeText={(text: string) => {
          onSearchFilters(text);
          filters.map(({ flatListRef }) => {
            flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
          });
        }}
      />
      <ScrollView>
        {!!filters.length &&
          filters.map(filter => {
            const { name, content, loading, flatListRef } = filter;
            if (!loading && !content.length) return <View key={name} />;
            return (
              <View key={name}>
                <FilterName>{name}</FilterName>
                <FlatList
                  ref={flatListRef}
                  horizontal
                  showsHorizontalScrollIndicator
                  contentContainerStyle={{ paddingBottom: 10 }}
                  keyExtractor={c => c}
                  ListFooterComponent={() => {
                    return (
                      <>
                        {loading && (
                          <Container height={HEIGHT_ITEM} width={width}>
                            <Loading />
                          </Container>
                        )}
                        {!loading && !content.length && (
                          <Container height={HEIGHT_ITEM} width={width}>
                            <NoRecords>No records found</NoRecords>
                          </Container>
                        )}
                      </>
                    );
                  }}
                  data={content}
                  renderItem={item => renderItem(item, name, onPress)}
                />
              </View>
            );
          })}
      </ScrollView>
    </>
  );
};

export default Filters;
