import produce from 'immer';
import SessionModel from '../../models/SessionModel';
import {authStore} from '../auth/AuthStore';
import {userStore} from '../user/UserStore';
import {sessionStore} from './SessionStore';
import {User} from '../user/UserTypes';

const SessionActions = (set: any) => {
  return {
    setLogin: (isLogin: boolean) => {
      set(
        produce((state: SessionModel) => {
          state.isLogin = isLogin;
        }),
      );
    },
    setUser: (user: User) => {
      set(
        produce((state: SessionModel) => {
          state.user = user;
        }),
      );
    },
    logout: () => {
      sessionStore.getState().clear();
      authStore.getState().clear();
      userStore.getState().clear();
    },
    setToken: (token?: string) => {
      set(
        produce((state: SessionModel) => {
          state.token = token;
        }),
      );
    },
  };
};

export default SessionActions;
