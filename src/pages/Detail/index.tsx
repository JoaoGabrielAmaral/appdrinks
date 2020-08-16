import React from 'react';
import { View, Image, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YouTube from 'react-native-youtube';

import { useDrinks } from '../../hooks/drinks';

import { Name, ContainerImage, Container, Title, Item } from './styles';
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
  const urlVideo = item?.strVideo;
  const idVideo = urlVideo && urlVideo.split('=')[1];

  return (
    <View>
      <Name>{item.strDrink}</Name>
      <ContainerImage>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ height: 250, width: 250, borderWidth: 1 }}
        />
      </ContainerImage>
      <Container>
        <Title>Ingredient</Title>
        {ingredients &&
          ingredients.map((ingredient, i) => (
            <Item key={`ITEM_${i}`}>
              {++i}
              {') '}
              {ingredient}
            </Item>
          ))}
      </Container>
      <Container>
        <Title>Instructions</Title>
        <Item>{item.strInstructions}</Item>
      </Container>
      {!!idVideo?.length && (
        <Container>
          <Title>Video</Title>
          <YouTube
            apiKey={idVideo}
            videoId={idVideo}
            style={{ alignSelf: 'stretch', height: 300 }}
          />
        </Container>
      )}
    </View>
  );
};

const Detail: React.FC = () => {
  const { navigate } = useNavigation();
  const { loading, detail } = useDrinks();

  return (
    <>
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
    </>
  );
};

export default Detail;
