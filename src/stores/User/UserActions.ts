import produce from 'immer';
import UserModel from '../../models/UserModel';
import ApiServices from '../../services/ApiServices';
import {sessionStore} from '../session/SessionStore';

const UserActions = (set, get) => {
  return {
    setUser: (user: {
      username: string;
      token_user: string;
      id_role: number;
      name_role: string;
      nama_toko: string;
    }) => {
      set(
        produce((state: UserModel) => {
          state.user = user;
        }),
      );
    },
    getHome: async () => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getHome();
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.homeData = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
  };
};

export default UserActions;
