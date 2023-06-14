import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationServices from '../services/NavigationServices';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import SessionModel from '../models/SessionModel';
import useSessionStore from '../stores/session/SessionStore';
import {connect} from '../services/ZustandHelper';
import PurchaseNavigation from './PurchaseNavigation';
import CuciNavigation from './CuciNavigation';

const RootNavigation = ({isLogin, user}) => {
  const renderMain = () => {
    if (user?.id_role === 1) {
      return <MainNavigation />;
    }

    if (user?.id_role === 2) {
      return <PurchaseNavigation />;
    }

    if (user?.id_role === 3) {
      return <CuciNavigation />;
    }

    return <MainNavigation />;
  };

  return (
    <NavigationContainer
      ref={r => {
        NavigationServices.setInstance(r);
      }}>
      {isLogin ? renderMain() : <AuthNavigation />}
    </NavigationContainer>
  );
};

const sessionSelector = (state: SessionModel) => ({
  isLogin: state.isLogin,
  user: state.user,
});

const stores = [{store: useSessionStore, selector: sessionSelector}];

export default connect(stores)(RootNavigation);
