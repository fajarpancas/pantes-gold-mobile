import {ApiRequestModel, LoginParams} from './apimodel/ApiRequest';
import StoreModel from './StoreModel';

interface AuthModel extends ApiRequestModel, StoreModel {
  loginRequest: (params: LoginParams) => void;
}

export default AuthModel;
