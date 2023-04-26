import {register} from 'react-native-bundle-splitter';

export const HomeScreen = register({
  loader: () => require('../../screens/main/HomeScreen'),
  name: 'HomeScreen',
});

export const CartScreen = register({
  loader: () => require('../../screens/main/CartScreen'),
  name: 'CartScreen',
});

export const AddOrderScreen = register({
  loader: () => require('../../screens/main/AddOrderScreen'),
  name: 'AddOrderScreen',
});

export const OrderScreen = register({
  loader: () => require('../../screens/main/OrderScreen'),
  name: 'OrderScreen',
});
