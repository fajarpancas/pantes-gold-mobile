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

export type MainStackParams = {
  Main: undefined;
  AddOrderScreen: undefined;
  OrderScreen: undefined;
  OfferDetailScreen: undefined;
};

type RootParamList = ReactNavigation.RootParamList;

export type NavigationRefType = NavigationContainerRef<RootParamList> | null;
