module.exports = `
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: 'transparent',
        },
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

`;
