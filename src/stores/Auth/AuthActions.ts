import produce from 'immer';
import {LoginParams} from '../../models/apimodel/ApiRequest';
import AuthModel from '../../models/AuthModel';
import ApiServices from '../../services/ApiServices';
import {sessionStore} from '../session/SessionStore';
import LoadingHelper from '../../services/LoadingHelper';

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
          ApiServices.setHeader(
            'Authorization',
            `Bearer ${response.data?.data?.token_user}`,
          );
          sessionStore.getState().setLogin(true);
          sessionStore.getState().setToken(response.data?.data?.token_user);
          sessionStore.getState().setUser(response.data.data);
          LoadingHelper.hide();
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
