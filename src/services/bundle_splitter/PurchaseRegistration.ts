import {register} from 'react-native-bundle-splitter';

export const HomePurchaseScreen = register({
  loader: () => require('../../screens/main/Purchase/HomePurchaseScreen'),
  name: 'HomePurchaseScreen',
});

export const MenuOfferScreen = register({
  loader: () => require('../../screens/main/Purchase/MenuOfferScreen'),
  name: 'MenuOfferScreen',
});
