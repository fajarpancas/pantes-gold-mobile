import produce from 'immer';
import {LoginParams, RegisterParams} from '../../models/apimodel/ApiRequest';
import AuthModel from '../../models/AuthModel';
import ApiServices from '../../services/ApiServices';
import {sessionStore} from '../session/SessionStore';
import LoadingHelper from '../../services/LoadingHelper';
import NavigationServices from '../../services/NavigationServices';

const SessionActions = (set: any) => {
  return {
    loginRequest: async (params: LoginParams) => {
      LoadingHelper.show();
      set(
        produce((state: AuthModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.login(params);
        if (response.ok) {
          ApiServices.setHeaders({
            Authorization: `Bearer ${response.data?.data?.token_user}`,
          });
          // setTimeout(() => {
          sessionStore.getState().setLogin(true);
          if (response?.data) {
            sessionStore.getState().setToken(response.data?.data?.token_user);
            sessionStore.getState().setUser(response.data.data);
          }
          LoadingHelper.hide();
          // }, 500);
        } else {
          LoadingHelper.hide();
          throw response.problem;
        }
        LoadingHelper.hide();
      } catch (error) {
        LoadingHelper.hide();
        set(
          produce((state: AuthModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    registerRequest: async (params: RegisterParams) => {
      LoadingHelper.show();
      set(
        produce((state: AuthModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.register(params);
        if (response.ok) {
          LoadingHelper.hide();
          setTimeout(() => {
            NavigationServices.pop();
          }, 500);
        } else {
          LoadingHelper.hide();
          throw response.problem;
        }
        LoadingHelper.hide();
      } catch (error) {
        LoadingHelper.hide();
        set(
          produce((state: AuthModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
  };
};

export default SessionActions;
