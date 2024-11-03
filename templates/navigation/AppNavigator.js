module.exports = `
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from './routes';

import Home from '../screens/App/Home';

import HomeLine from '../assets/icons/home.svg';
import HomeFill from '../assets/icons/home-fill.svg';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const iconList = {
    home: HomeLine,
    homeFill: HomeFill,
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          backgroundColor: '#6a5acd',
        },
        tabBarIcon: ({focused}) => {
          let IconComponent;

          if (route.name === routes.HOME) {
            IconComponent = focused ? iconList.homeFill : iconList.home;
          }

          return <IconComponent width={24} height={24} />;
        },
      })}>
      <Tab.Screen name={routes.HOME} component={Home} />
    </Tab.Navigator>
  );
};

export default AppNavigator;


`;
