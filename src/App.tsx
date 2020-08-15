import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { DrinksProvider } from './hooks/drinks';
import Home from './pages/Home';

const App: React.FC = () => (
  <>
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#EB5757" />
      <DrinksProvider>
        <Home />
      </DrinksProvider>
    </NavigationContainer>
  </>
);

export default App;
