import StoreModel from './StoreModel';

interface SessionModel extends StoreModel {
  isLogin: boolean;
  token?: string;
  setToken: (token?: string) => void;
  setLogin: (isLogin: boolean) => void;
  logout: () => void;
}

export default SessionModel;
