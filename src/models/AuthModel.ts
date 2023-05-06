import {
  ApiRequestModel,
  LoginParams,
  RegisterParams,
} from './apimodel/ApiRequest';
import StoreModel from './StoreModel';

interface AuthModel extends ApiRequestModel, StoreModel {
  loginRequest: (params: LoginParams) => void;
  registerRequest: (params: RegisterParams) => void;
}

export default AuthModel;
