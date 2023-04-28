import {User} from '../stores/user/UserTypes';
import StoreModel from './StoreModel';

interface SessionModel extends StoreModel {
  isLogin: boolean;
  token?: string;
  user: User;
  setToken: (token?: string) => void;
  setUser: (user: User) => void;
  setLogin: (isLogin: boolean) => void;
  logout: () => void;
}

export default SessionModel;
