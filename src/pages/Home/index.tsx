import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useDrinks } from '../../hooks/drinks';

import Filters from '../Filters';
import Drinks from '../Drinks';
import Detail from '../Detail';

const Stack = createStackNavigator();

const Home: React.FC = () => {
  const { getFilters } = useDrinks();

  useEffect(() => {
    getFilters();
  }, [getFilters]);

  return (
    <Stack.Navigator
      initialRouteName="Filters"
      screenOptions={{
        // headerShown: false,
        cardStyle: {
          backgroundColor: '#EB5757',
        },
        headerStyle: {
          backgroundColor: '#EB5757',
        },
      }}
    >
      <Stack.Screen
        name="Filters"
        component={Filters}
        options={{
          title: 'Menu',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Drinks"
        options={{
          title: 'Drinks',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
        }}
        component={Drinks}
      />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default Home;
