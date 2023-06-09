import StoreModel from './StoreModel';
import {
  CreateOfferParams,
  CreateOrderParams,
  GetOfferListParams,
  GetOrderListParams,
} from './apimodel/ApiRequest';

type Order = {
  id_order: number;
  url_foto: string;
  nama_barang: string;
  qty: number;
  kadar: string;
  berat: string;
  created_at: string;
  status: number;
};

type Penawaran = {
  id_penawaran: number;
  url_foto: string;
  keterangan_produk: string;
};

type Cabang = {
  kd_toko: string;
  nama_toko: string;
  alamat: string;
  initial: string;
};

type Cart = {
  id_order: number;
  url_foto: string;
  nama_barang: string;
  qty: number;
  qty_acc: null | string;
  created_at: string;
  status: number;
};

interface UserModel extends StoreModel {
  loading: boolean;
  error: boolean;
  user?: {
    username: string;
    token_user: string;
    id_role: number;
    name_role: string;
    nama_toko: string;
  };
  setUser: (user: object) => void;
  homeData: {
    order: Order[];
    penawaran: Penawaran[];
  };
  getHome: () => void;
  getCabang: (params?: any) => void;
  cabang: Cabang[];
  createOrder: (order: CreateOrderParams, callback: () => void) => void;
  getOrderList: (params: GetOrderListParams) => void;
  orderList: Order[];
  createOffer: (order: CreateOfferParams, callback: () => void) => void;
  getOfferList: (params: GetOfferListParams) => void;
  offerList: Penawaran[];
  getCartList: () => void;
  cartList: Cart[];
  getJenisBarang: () => void;
  submitTerimaCabang: (params: any, callback: () => void) => void;
  getDetailOrder: (params: any, callback: (res: any) => void) => void;
  jenisBarang: {
    kd_barang: string;
    nama_jenis_barang: string;
  }[];
}

export default UserModel;
