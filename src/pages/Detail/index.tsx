import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import YouTube from 'react-native-youtube';

import { useDrinks } from '../../hooks/drinks';

import {
  ContainerName,
  Image,
  Name,
  Alcoholic,
  ContainerImage,
  Container,
  Title,
  Item,
} from './styles';

import Loading from '../../components/Loading/LoadingCenter';

const getIngredients = detail => {
  const items = [] as any[];

  Object.keys(detail).forEach(key => {
    if (key.startsWith('strIngredient') && detail[key]) {
      const numberIngredient = key.replace('strIngredient', '');
      const measure = detail[`strMeasure${numberIngredient}`];
      items.push(
        `${(measure || '').trim()} ${(detail[key] || '').trim()}`.trim(),
      );
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
      <ContainerImage>
        <Image source={{ uri: item.strDrinkThumb }} />
        <ContainerName style={{ elevation: 5 }}>
          <Name>{item.strDrink}</Name>
          <Alcoholic>{item.strAlcoholic}</Alcoholic>
        </ContainerName>
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
      {!!item.strInstructions.length && (
        <Container>
          <Title>Instructions</Title>
          <Item>{item.strInstructions}</Item>
        </Container>
      )}
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
