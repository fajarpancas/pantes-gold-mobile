import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationServices from '../services/NavigationServices';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import SessionModel from '../models/SessionModel';
import useSessionStore from '../stores/session/SessionStore';
import {connect} from '../services/ZustandHelper';

const RootNavigation = ({isLogin}) => {
  return (
    <NavigationContainer
      ref={r => {
        NavigationServices.setInstance(r);
      }}>
      {isLogin ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

// You can access props from here to put it into selectos.
const Selectors = (props: any) => ({
  isLogin: useSessionStore((state: SessionModel) => state.isLogin),
});

export default connect(Selectors)(RootNavigation);
