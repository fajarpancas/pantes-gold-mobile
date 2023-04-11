import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  MoreScreen,
} from '../services/bundle_splitter/MainRegistration';
import {MainTabParams} from '../models/NavigationModel';
const Tab = createBottomTabNavigator<MainTabParams>();

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={{freezeOnBlur: true}}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Tab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{title: 'More'}}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
