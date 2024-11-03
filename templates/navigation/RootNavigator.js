module.exports = `
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';


import routes from './routes';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
        <Stack.Screen name={routes.APP_NAVIGATOR} component={AppNavigator} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

`;
