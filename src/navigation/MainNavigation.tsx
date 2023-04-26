import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainStackParams} from '../models/NavigationModel';
import MainTab from './MainTab';
import {
  AddOrderScreen,
  OrderScreen,
} from '../services/bundle_splitter/MainRegistration';

const Stack = createNativeStackNavigator<MainStackParams>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Main"
        component={MainTab}
      />

      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{title: 'Pesanan', headerShadowVisible: false}}
      />
      <Stack.Screen
        name="AddOrderScreen"
        component={AddOrderScreen}
        options={{title: 'Pesan', headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
