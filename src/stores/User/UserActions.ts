import produce from 'immer';
import UserModel from '../../models/UserModel';

const UserActions = (set, get) => {
  return {
    setUser: (user: object) => {
      set(
        produce((state: UserModel) => {
          state.user = user;
        }),
      );
    },
  };
};

export default UserActions;
