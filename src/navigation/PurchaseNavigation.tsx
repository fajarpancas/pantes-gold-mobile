import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PurchaseStackParams} from '../models/NavigationModel';
import PurchaseTab from './PurchaseTab';
import {
  AddPurchaseOffer,
  PurchaseOfferDetail,
} from '../services/bundle_splitter/PurchaseRegistration';
import OrderBuyDetailScreen from '../screens/main/Purchase/OrderBuyDetailScreen';
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

      <Stack.Screen
        name="AddPurchaseOffer"
        component={AddPurchaseOffer}
        options={{title: 'Tambah Penawaran', headerShadowVisible: false}}
      />

      <Stack.Screen
        name="PurchaseOfferDetailScreen"
        component={PurchaseOfferDetail}
        options={{title: 'Detail Penawaran', headerShadowVisible: false}}
      />

      <Stack.Screen
        name="OrderBuyDetailScreen"
        component={OrderBuyDetailScreen}
        options={{title: 'Pesan Beli Detail', headerShadowVisible: false}}
      />
    </Stack.Navigator>
  );
};

export default PurchaseNavigation;
