import React, { useCallback, useRef, useState, useEffect } from 'react';
import { View, FlatList, ScrollView, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
  Container,
  ContainerItem,
  Item,
  NoRecords,
  IconDetail,
  ContainerFlatList,
} from './styles';
import { useDrinks } from '../../hooks/drinks';

import Loading from '../../components/Loading/LoadingCenter';
import Search from '../../components/Search';
import Filter from '../../components/Filter';

const HEIGHT_ITEM = 80;
const { width } = Dimensions.get('window');

const renderFilter = (
  item,
  active: boolean,
  onPress: (nameFilter: string) => void,
) => {
  const { name } = item;
  return (
    <Filter
      name={name}
      active={active}
      onPress={() => {
        onPress(name);
      }}
    />
  );
};

const renderItem = ({ item }: any, nameFilter, onPress) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress(nameFilter, item)}
    >
      <ContainerItem height={HEIGHT_ITEM}>
        <Item>{item}</Item>
        <IconDetail />
      </ContainerItem>
    </TouchableOpacity>
  );
};

const Filters: React.FC = () => {
  const { navigate } = useNavigation();

  const {
    categories,
    glasses,
    ingredients,
    alcoholic,
    loading,
    onSearchFilters,
    onFilter,
  } = useDrinks();

  const flatListRef = useRef(null);
  const [filter, setFilter] = useState('Categories');
  const [content, setContent] = useState(categories);

  const filters = [
    {
      name: 'Categories',
      content: categories,
    },
    {
      name: 'Glasses',
      content: glasses,
    },
    {
      name: 'Ingredients',
      content: ingredients,
    },
    {
      name: 'Alcoholic',
      content: alcoholic,
    },
  ];

  const getContent = useCallback(() => {
    return filters.filter(f => f.name === filter)[0];
  }, [filters, filter]);

  useEffect(() => {
    const filtered = getContent();
    setContent(filtered.content);
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
  }, [filter, getContent]);

  const onPress = useCallback(
    (typeFilter: string, nameFilter: string) => {
      onFilter(typeFilter, nameFilter);
      navigate('Drinks');
    },
    [onFilter, navigate],
  );

  const onPressFilter = useCallback(
    (nameFilter: string): void => {
      if (filter === nameFilter) return;
      setFilter(nameFilter);
    },
    [filter],
  );

  return (
    <>
      <Search
        placeholder="Search"
        onChangeText={(text: string) => {
          onSearchFilters(text);
          flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
        }}
      />
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={c => c.name}
          data={filters}
          renderItem={({ item }) => {
            const itemActive = filter === item.name;
            return renderFilter(item, itemActive, onPressFilter);
          }}
        />
      </View>
      <ContainerFlatList>
        <FlatList
          ref={flatListRef}
          showsVerticalScrollIndicator={false}
          keyExtractor={c => c}
          style={{ marginTop: 2 }}
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
                <View style={{ height: 10 }} />
              </>
            );
          }}
          data={content}
          renderItem={item => renderItem(item, filter, onPress)}
        />
      </ContainerFlatList>
    </>
  );
};

export default Filters;
