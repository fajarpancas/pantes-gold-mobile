import {register} from 'react-native-bundle-splitter';

export const HomeCuciScreen = register({
  loader: () => require('../../screens/main/Purchase/HomeCuciScreen'),
  name: 'HomeCuciScreen',
});

export const CabangPesanCuciScreen = register({
  loader: () => require('../../screens/main/Purchase/CabangPesanCuciScreen'),
  name: 'CabangPesanCuciScreen',
});

export const MenuAccountScreen = register({
  loader: () => require('../../screens/main/Purchase/MenuAccountScreen'),
  name: 'MenuAccountScreen',
});

export const PusatPesanCuciDetailScreen = register({
  loader: () =>
    require('../../screens/main/Purchase/PusatPesanCuciDetailScreen'),
  name: 'PusatPesanCuciDetailScreen',
});

export const CabangPesanCuciDetailScreen = register({
  loader: () =>
    require('../../screens/main/Purchase/CabangPesanCuciDetailScreen'),
  name: 'CabangPesanCuciDetailScreen',
});

export const CuciOrderBuyScreen = register({
  loader: () => require('../../screens/main/Cuci/CuciOrderBuyScreen'),
  name: 'CuciOrderBuyScreen',
});

export const OrderDetailCuciScreen = register({
  loader: () => require('../../screens/main/Cuci/OrderDetailCuciScreen'),
  name: 'OrderDetailCuciScreen',
});

export const AddOrderCuciScreen = register({
  loader: () => require('../../screens/main/Cuci/AddOrderCuciScreen'),
  name: 'AddOrderCuciScreen',
});
