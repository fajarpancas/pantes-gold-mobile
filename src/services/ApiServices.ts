// a library to wrap and simplify api calls
import apisauce, {ApiResponse, ApisauceInstance, HEADERS} from 'apisauce';
import {
  CreateOfferParams,
  CreateOrderParams,
  GetOfferListParams,
  GetOrderListParams,
  LoginParams,
  RegisterParams,
} from '../models/apimodel/ApiRequest';
import {
  GetCabangResponse,
  GetHomeResponse,
  LoginResponse,
} from '../models/apimodel/ApiResponse';
import DropdownAlertHolder from './DropdownAlertHolder';
import {sessionStore} from '../stores/session/SessionStore';

class ApiServices {
  api: ApisauceInstance;
  constructor() {
    // const baseURL = `${getConstantForKey('BASE_URL')}api`;
    const baseURL = 'http://pantesrequest.motekarindo.com/api';
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
    this.setHeader = this.setHeader.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.getHome = this.getHome.bind(this);
    this.getCabang = this.getCabang.bind(this);
    this.createOrder = this.createOrder.bind(this);
    this.createOffer = this.createOffer.bind(this);
    this.getOrderList = this.getOrderList.bind(this);
    this.getOfferList = this.getOfferList.bind(this);
    this.getCartList = this.getCartList.bind(this);
    this.getPurchaseOrder = this.getPurchaseOrder.bind(this);
    this.getPurchaseOffer = this.getPurchaseOffer.bind(this);
    this.handleResponseMonitoring = this.handleResponseMonitoring.bind(this);

    this.api.addMonitor(this.handleResponseMonitoring);
  }

  setHeaders(headers: HEADERS) {
    this.api.setHeaders(headers);
  }

  setHeader(key: string, value: string) {
    this.api.setHeader(key, value);
  }

  handleResponseMonitoring(response: ApiResponse<any>) {
    const {problem, data} = response;

    switch (problem) {
      case 'CLIENT_ERROR': {
        if (data?.message === 'Token is Expired') {
          sessionStore.getState().setLogin(false);
        }
        DropdownAlertHolder.showError('Request Gagal', data?.message);
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

  logout(): Promise<any> {
    return this.api.post('/logout');
  }

  register(params: RegisterParams) {
    return this.api.post('/register', params);
  }

  getHome(): Promise<GetHomeResponse> {
    return this.api.get('/home');
  }

  getCabang(): Promise<GetCabangResponse> {
    return this.api.get('/get-cabang');
  }

  createOrder(params: CreateOrderParams): Promise<any> {
    let body = new FormData();
    body.append('berat', params?.berat);
    body.append('kadar', params?.kadar);
    body.append('jenis_pesan', params?.jenis_pesan);
    body.append('nama_barang', params?.nama_barang);
    body.append('url_foto', params?.url_foto);
    body.append('qty', params?.qty);
    return this.api.post('/order/create', params);
  }

  createOffer(params: CreateOfferParams): Promise<any> {
    let body = new FormData();
    body.append('id_penawaran', params?.id_penawaran);
    body.append('qty', params?.qty);
    return this.api.post('/penawaran/create', params);
  }

  getOrderList(params: GetOrderListParams): Promise<any> {
    return this.api.get('/order', params);
  }

  getOfferList(params: GetOfferListParams): Promise<any> {
    return this.api.get('/penawaran', params);
  }

  getCartList(): Promise<any> {
    return this.api.get('/get-cart');
  }

  //Purchase
  getPurchaseOrder(params: string): Promise<any> {
    return this.api.get('pusat/order', params);
  }

  getPurchaseOffer(): Promise<any> {
    return this.api.get('pusat/penawaran');
  }
}

export default new ApiServices();
