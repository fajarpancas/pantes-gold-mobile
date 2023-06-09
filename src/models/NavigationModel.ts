import {NavigationContainerRef} from '@react-navigation/native';

export type AuthStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type MainTabParams = {
  HomeScreen: undefined;
  AddOrder: undefined;
  CartScreen: undefined;
};

export type PurchaseTabParams = {
  HomePurchaseScreen: undefined;
  MenuOfferScreen: undefined;
  MenuOrderBuyScreen: undefined;
  PesanBeliCuciScreen: undefined;
  MenuBuyScreen: undefined;
  MenuAccountScreen: undefined;
};

export type CuciTabParams = {
  HomeCuciScreen: undefined;
  CabangPesanCuciScreen: undefined;
  CuciOrderBuyScreen: undefined;
  MenuAccountScreen: undefined;
};

export type MainStackParams = {
  Main: undefined;
  AddOrderScreen: undefined;
  OrderScreen: undefined;
  OfferDetailScreen: undefined;
  OrderDetailScreen: undefined;
  OfferScreen: undefined;
};

export type PurchaseStackParams = {
  PurchaseMain: undefined;
  AddPurchaseOffer: undefined;
  PurchaseOfferDetailScreen: undefined;
  OrderBuyDetailScreen: undefined;
  PurchaseOrderDetailScreen: undefined;
  AddPesanCuci: undefined;
  PesanCuciDetailScreen: undefined;
  PurchaseOrderDetailCuciScreen: undefined;
};

export type CuciStackParams = {
  CuciMain: undefined;
  PusatPesanCuciDetailScreen: undefined;
  CabangPesanCuciDetailScreen: undefined;
  AddOrderCuciScreen: undefined;
  OrderDetailCuciScreen: undefined;
};

type RootParamList = ReactNavigation.RootParamList;

export type NavigationRefType = NavigationContainerRef<RootParamList> | null;
