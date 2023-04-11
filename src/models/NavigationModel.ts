import {NavigationContainerRef} from '@react-navigation/native';

export type AuthStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type MainTabParams = {
  HomeScreen: undefined;
  MoreScreen: undefined;
};

export type MainStackParams = {
  Main: undefined;
};

type RootParamList = ReactNavigation.RootParamList;

export type NavigationRefType = NavigationContainerRef<RootParamList> | null;
