import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useDrinks } from '../../hooks/drinks';

import Categories from '../Categories';
import Drinks from '../Drinks';
import Detail from '../Detail';

const Stack = createStackNavigator();

const Home: React.FC = () => {
  const { getCategories } = useDrinks();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Stack.Navigator
      initialRouteName="Companies"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#EB5757',
        },
      }}
    >
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Drinks" component={Drinks} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default Home;
