// a library to wrap and simplify api calls
import apisauce, {ApiResponse, ApisauceInstance, HEADERS} from 'apisauce';
import {LoginParams, RegisterParams} from '../models/apimodel/ApiRequest';
import {LoginResponse} from '../models/apimodel/ApiResponse';
import {getConstantForKey} from '../modules/ConstantHelper';
import DropdownAlertHolder from './DropdownAlertHolder';

class ApiServices {
  api: ApisauceInstance;
  constructor() {
    const baseURL = `${getConstantForKey('BASE_URL')}api`;
    this.api = apisauce.create({
      // base URL is read from the "constructor"
      baseURL,
      // here are some default headers
      headers: {
        'Cache-Control': 'no-cache',
      },
      // 10 second timeout...
      timeout: 60000,
    });

    this.setHeaders = this.setHeaders.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.handleResponseMonitoring = this.handleResponseMonitoring.bind(this);

    this.api.addMonitor(this.handleResponseMonitoring);
  }

  setHeaders(headers: HEADERS) {
    this.api.setHeaders(headers);
  }

  handleResponseMonitoring(response: ApiResponse<any>) {
    const {problem, data} = response;

    switch (problem) {
      case 'CLIENT_ERROR': {
        const {error} = data;
        DropdownAlertHolder.showError('Request Gagal', error);
        break;
      }
      case 'CONNECTION_ERROR':
      case 'SERVER_ERROR': {
        DropdownAlertHolder.showError(
          'Mohon Maaf',
          'Ada kendala pada server kami',
        );
        break;
      }
      case 'TIMEOUT_ERROR':
      case 'NETWORK_ERROR': {
        DropdownAlertHolder.showError(
          'Request Gagal',
          'perika koneksi internet kamu dan coba lagi nanti',
        );
        break;
      }
      default: {
        //
      }
    }
  }

  login(params: LoginParams): Promise<LoginResponse> {
    let body = new FormData();
    body.append('username', params?.username);
    body.append('password', params?.password);
    return this.api.post('/login', body);
  }

  register(params: RegisterParams) {
    return this.api.post('/register', params);
  }
}

export default new ApiServices();
