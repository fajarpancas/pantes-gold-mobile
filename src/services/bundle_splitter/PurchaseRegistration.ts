import {register} from 'react-native-bundle-splitter';

export const HomePurchaseScreen = register({
  loader: () => require('../../screens/main/Purchase/HomePurchaseScreen'),
  name: 'HomePurchaseScreen',
});

export const MenuOfferScreen = register({
  loader: () => require('../../screens/main/Purchase/MenuOfferScreen'),
  name: 'MenuOfferScreen',
});

export const AddPurchaseOffer = register({
  loader: () => require('../../screens/main/Purchase/AddPurchaseOffer'),
  name: 'AddPurchaseOffer',
});

export const PurchaseOfferDetail = register({
  loader: () =>
    require('../../screens/main/Purchase/PurchaseOfferDetailScreen'),
  name: 'PurchaseOfferDetailScreen',
});

export const MenuOrderBuyScreen = register({
  loader: () => require('../../screens/main/Purchase/MenuOrderBuyScreen'),
  name: 'MenuOrderBuyScreen',
});

export const MenuBuyScreen = register({
  loader: () => require('../../screens/main/Purchase/MenuBuyScreen'),
  name: 'MenuBuyScreen',
});

export const OrderBuyDetailScreen = register({
  loader: () => require('../../screens/main/Purchase/OrderBuyDetailScreen'),
  name: 'OrderBuyDetailScreen',
});

export const PurchaseOrderDetailScreen = register({
  loader: () =>
    require('../../screens/main/Purchase/PurchaseOrderDetailScreen'),
  name: 'PurchaseOrderDetailScreen',
});

export const MenuAccountScreen = register({
  loader: () => require('../../screens/main/Purchase/MenuAccountScreen'),
  name: 'MenuAccountScreen',
});

export const AddPesanCuci = register({
  loader: () => require('../../screens/main/Purchase/AddPesanCuci'),
  name: 'AddPesanCuci',
});

export const PesanCuciDetailScreen = register({
  loader: () => require('../../screens/main/Purchase/PesanCuciDetailScreen'),
  name: 'PesanCuciDetailScreen',
});

export const PesanBeliCuciListScreen = register({
  loader: () => require('../../screens/main/Cuci/PesanBeliCuciListScreen'),
  name: 'PesanBeliCuciListScreen',
});

export const PurchaseOrderDetailCuciScreen = register({
  loader: () =>
    require('../../screens/main/Cuci/PurchaseOrderDetailCuciScreen'),
  name: 'PurchaseOrderDetailCuciScreen',
});
