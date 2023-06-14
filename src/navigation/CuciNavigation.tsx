import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CuciStackParams} from '../models/NavigationModel';
import PurchaseCuciTab from './PurchaseCuciTab';
// import {} from '../services/bundle_splitter/CuciRegistration';
const Stack = createNativeStackNavigator<CuciStackParams>();

const CuciNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="CuciMain"
        component={PurchaseCuciTab}
      />
    </Stack.Navigator>
  );
};

export default CuciNavigation;
