import produce from 'immer';
import SessionModel from '../../models/SessionModel';
import {authStore} from '../auth/AuthStore';
import {userStore} from '../user/UserStore';
import {sessionStore} from '../session/SessionStore';

const SessionActions = (set: any) => {
  return {
    setLogin: (isLogin: boolean) => {
      set(
        produce((state: SessionModel) => {
          state.isLogin = isLogin;
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
