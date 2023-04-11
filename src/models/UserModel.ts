import StoreModel from './StoreModel';

interface UserModel extends StoreModel {
  user?: object;
  setUser: (user: object) => void;
}

export default UserModel;
