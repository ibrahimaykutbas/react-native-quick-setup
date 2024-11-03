module.exports = ` 
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/Auth/SplashScreen';


import routes from './routes';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routes.SPLASHSCREEN} component={SplashScreen} />

    </Stack.Navigator>
  );
};

export default AuthNavigator

`;
