// a library to wrap and simplify api calls
import apisauce, {ApiResponse, ApisauceInstance, HEADERS} from 'apisauce';
import {
  CreateOfferParams,
  CreateOrderParams,
  GetOfferListParams,
  GetOrderListParams,
  LoginParams,
  OfferDetailParams,
  PublishOfferParams,
  RegisterParams,
} from '../models/apimodel/ApiRequest';
import {
  GetCabangResponse,
  GetHomeResponse,
  LoginResponse,
} from '../models/apimodel/ApiResponse';
import DropdownAlertHolder from './DropdownAlertHolder';
import {sessionStore} from '../stores/session/SessionStore';
import {CreateOffer} from '../stores/purchase/PurchaseTypes';

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
    this.createPurchaseOffer = this.createPurchaseOffer.bind(this);
    this.getPabrik = this.getPabrik.bind(this);
    this.getOfferDetail = this.getOfferDetail.bind(this);
    this.publishOffer = this.publishOffer.bind(this);
    this.getPesanBeli = this.getPesanBeli.bind(this);
    this.getPesanBeliDetail = this.getPesanBeliDetail.bind(this);
    this.submitQtyPesanBeli = this.submitQtyPesanBeli.bind(this);
    this.getPurchaseOrderDetail = this.getPurchaseOrderDetail.bind(this);
    this.submitPurchaseOrder = this.submitPurchaseOrder.bind(this);
    this.getPesanCuci = this.getPesanCuci.bind(this);
    this.submitPesanCuci = this.submitPesanCuci.bind(this);
    this.getPesanCuciDetail = this.getPesanCuciDetail.bind(this);
    this.getPusatPesanCuci = this.getPusatPesanCuci.bind(this);
    this.submitPusatPesanCuci = this.submitPusatPesanCuci.bind(this);
    this.getCabangPesanCuci = this.getCabangPesanCuci.bind(this);
    this.getCabangPesanCuciDetail = this.getCabangPesanCuciDetail.bind(this);
    this.submitCabangPesanCuci = this.submitCabangPesanCuci.bind(this);
    this.getJenisBarang = this.getJenisBarang.bind(this);
    this.submitTerimaPesanCuci = this.submitTerimaPesanCuci.bind(this);
    this.getDetailOrder = this.getDetailOrder.bind(this);
    this.submitTerimaCabang = this.submitTerimaCabang.bind(this);
    this.createOrderCuci = this.createOrderCuci.bind(this);
    this.getDetailOrderCuci = this.getDetailOrderCuci.bind(this);
    this.getOrderCuciList = this.getOrderCuciList.bind(this);
    this.submitTerimaOrderCuci = this.submitTerimaOrderCuci.bind(this);
    this.handleResponseMonitoring = this.handleResponseMonitoring.bind(this);
  }

  setHeaders(headers: HEADERS) {
    this.api.setHeaders(headers);
  }

  setHeader(key: string, value: string) {
    this.api.setHeader(key, value);
  }

  handleResponseMonitoring(response: ApiResponse<any>) {
    const {problem, data} = response;

    console.tron.error({response});
    switch (problem) {
      case 'CLIENT_ERROR': {
        if (data?.message === 'Token is Expired') {
          sessionStore.getState().setLogin(false);
        }
        console.tron.error({data});
        DropdownAlertHolder.showError(
          'Request Gagal',
          data?.message || data?.error,
        );
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

  getCabang(params: any): Promise<GetCabangResponse> {
    return this.api.get('/get-cabang', params);
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

  createPurchaseOffer(params: CreateOffer): Promise<any> {
    let body = new FormData();
    body.append('kd_produk', params?.kd_produk);
    body.append('id_pabrik', params?.id_pabrik);
    body.append('keterangan_produk', params?.keterangan_produk);
    body.append('deskripsi', params?.deskripsi);
    body.append('koleksi', params?.koleksi);
    body.append('kadar', params?.kadar);
    body.append('jenis_barang', params?.jenis_barang);
    body.append('berat', params?.berat);
    body.append('keterangan', params?.keterangan);
    body.append('url_foto', params?.url_foto);
    return this.api.post('pusat/penawaran/create', body);
  }

  getPabrik(): Promise<any> {
    return this.api.get('get-pabrik');
  }

  getOfferDetail(params: OfferDetailParams): Promise<any> {
    return this.api.get('pusat/penawaran/detail', params);
  }

  publishOffer(params: PublishOfferParams): Promise<any> {
    let body = new FormData();
    body.append('id_penawaran', params?.id_penawaran);
    body.append('kd_toko', params?.kd_toko);
    return this.api.post('/pusat/penawaran/publish', body);
  }

  getPesanBeli(): Promise<any> {
    return this.api.get('/pusat/penawaran-rekap');
  }

  getPesanBeliDetail(params: {kd_produk: string}): Promise<any> {
    return this.api.get('/pusat/penawaran-rekap/detail', params);
  }

  submitQtyPesanBeli(params: any): Promise<any> {
    let body = new FormData();
    body.append('id_order', params?.id_order);
    body.append('qty_acc', params?.qty_acc);
    return this.api.post('/pusat/penawaran-rekap/submit-qty', body);
  }

  getPurchaseOrderDetail(params: any): Promise<any> {
    return this.api.get('/pusat/order/detail', params);
  }

  submitPurchaseOrder(params: any): Promise<any> {
    return this.api.post('/pusat/order/submit', params);
  }

  getPesanCuci(): Promise<any> {
    return this.api.get('/pusat/order-cuci');
  }

  submitPesanCuci(params: any): Promise<any> {
    return this.api.post('/pusat/order-cuci', params);
  }

  getPesanCuciDetail(params: any): Promise<any> {
    return this.api.get('/pusat/order-cuci/detail', params);
  }

  getPusatPesanCuci(params: any): Promise<any> {
    return this.api.get('/cuci/order-cuci', params);
  }

  getPusatPesanCuciDetail(params: any): Promise<any> {
    return this.api.get('/cuci/order-cuci/detail', params);
  }

  submitPusatPesanCuci(params: any): Promise<any> {
    return this.api.post('/cuci/submit-order-cuci', params);
  }

  getCabangPesanCuci(params: any): Promise<any> {
    return this.api.get('/cuci/order', params);
  }

  getCabangPesanCuciDetail(params: any): Promise<any> {
    return this.api.get('/cuci/order/detail', params);
  }

  submitCabangPesanCuci(params: any): Promise<any> {
    return this.api.post('/cuci/order/submit', params);
  }

  getJenisBarang(): Promise<any> {
    return this.api.get('/get-jenis-barang');
  }

  submitTerimaPesanCuci(params: any): Promise<any> {
    return this.api.post('/pusat/terima-barang-cuci', params);
  }

  getDetailOrder(params: any): Promise<any> {
    return this.api.get('/order/detail', params);
  }

  submitTerimaCabang(params: any): Promise<any> {
    return this.api.post('/terima-barang', params);
  }

  createOrderCuci(params: CreateOrderParams): Promise<any> {
    return this.api.post('/cuci/order-pusat/create', params);
  }

  getDetailOrderCuci(params: any): Promise<any> {
    return this.api.get('/cuci/order-pusat/detail', params);
  }

  getOrderCuciList(params: GetOrderListParams): Promise<any> {
    return this.api.get('/cuci/order-pusat', params);
  }

  submitTerimaOrderCuci(params: any): Promise<any> {
    return this.api.post('/cuci/order-pusat/terima-barang', params);
  }
}

export default new ApiServices();
