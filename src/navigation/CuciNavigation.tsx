import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CuciStackParams} from '../models/NavigationModel';
import PurchaseCuciTab from './PurchaseCuciTab';
import {
  AddOrderCuciScreen,
  CabangPesanCuciDetailScreen,
  OrderDetailCuciScreen,
  PusatPesanCuciDetailScreen,
} from '../services/bundle_splitter/CuciRegistration';
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

      <Stack.Screen
        options={{title: 'Pesan Cuci Detail'}}
        name="PusatPesanCuciDetailScreen"
        component={PusatPesanCuciDetailScreen}
      />

      <Stack.Screen
        options={{title: 'Pesan Cuci Detail'}}
        name="CabangPesanCuciDetailScreen"
        component={CabangPesanCuciDetailScreen}
      />

      <Stack.Screen
        options={{title: 'Tambah Pesan Beli'}}
        name="AddOrderCuciScreen"
        component={AddOrderCuciScreen}
      />

      <Stack.Screen
        options={{title: 'Pesan Beli Detail'}}
        name="OrderDetailCuciScreen"
        component={OrderDetailCuciScreen}
      />
    </Stack.Navigator>
  );
};

export default CuciNavigation;
