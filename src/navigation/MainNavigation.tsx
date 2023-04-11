import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParams} from '../models/NavigationModel';
import MainTab from './MainTab';

const Stack = createNativeStackNavigator<MainStackParams>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Main"
        component={MainTab}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
