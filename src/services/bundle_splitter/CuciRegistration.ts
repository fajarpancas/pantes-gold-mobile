import {register} from 'react-native-bundle-splitter';

export const HomeCuciScreen = register({
  loader: () => require('../../screens/main/Purchase/HomeCuciScreen'),
  name: 'HomeCuciScreen',
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
