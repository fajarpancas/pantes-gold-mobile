import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PurchaseStackParams} from '../models/NavigationModel';
import PurchaseTab from './PurchaseTab';

const Stack = createNativeStackNavigator<PurchaseStackParams>();

const PurchaseNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="PurchaseMain"
        component={PurchaseTab}
      />

      {/* <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{title: 'Pesanan', headerShadowVisible: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default PurchaseNavigation;
