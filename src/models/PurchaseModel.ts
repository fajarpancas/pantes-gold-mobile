import {CreateOffer} from '../stores/purchase/PurchaseTypes';
import StoreModel from './StoreModel';
import {
  CreateOrderParams,
  GetOrderListParams,
  OfferDetailParams,
  PublishOfferParams,
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

type Offer = {
  id_penawaran: number;
  url_foto: string;
  keterangan_produk: string;
};

type Pabrik = {
  id_pabrik: number;
  nama_pabrik: String;
  status: number;
};

type PesanCuci = {
  id_order_cuci: number;
  no_pesan: String;
  kd_produk: String;
  url_foto: String;
  nama_barang: String;
  qty: String;
  kadar: String;
  jenis_barang: String;
  tgl_pesan: String;
  created_at: String;
  status: number;
};

interface PurchaseModel extends StoreModel {
  loading: boolean;
  error: boolean;
  purchaseOrder: {
    current_page: 1;
    data: Order[];
    last_page: number;
    per_page: number;
    total: number;
  };
  purchaseOrderCuci: {
    current_page: 1;
    data: Order[];
    last_page: number;
    per_page: number;
    total: number;
  };
  purchaseOffer: {
    current_page: 1;
    data: Offer[];
    last_page: number;
    per_page: number;
    total: number;
  };
  pabrikList: Pabrik[];
  getPurchaseOrder: (params: string) => void;
  getPurchaseOffer: () => void;
  createPurchaseOffer: (params: CreateOffer, callback: () => void) => void;
  getPabrik: () => void;
  getOfferDetail: (
    params: OfferDetailParams,
    callback: (data: any) => void,
  ) => void;
  publishOffer: (params: PublishOfferParams, callback: () => void) => void;
  getPesanBeli: () => void;
  pesanBeli: any[];
  getPesanBeliDetail: (
    params: {kd_produk: string},
    callback: (response: any) => void,
  ) => void;
  submitQtyPesanBeli: (params: any, callback: () => void) => void;
  getPurchaseOrderDetail: (params: any, callback: (data: any) => void) => void;
  submitPurchaseOrder: (parmas: any, callback: () => void) => void;
  getPesanCuci: () => void;
  pesanCuci: {
    current_page: 1;
    data: PesanCuci[];
    last_page: number;
    per_page: number;
    total: number;
  };
  submitPesanCuci: (params: any, callback: () => void) => void;
  getPesanCuciDetail: (params: any, callback: (res: any) => void) => void;
  getPusatPesanCuci: (params: any) => void;
  pusatPesanCuci: {
    current_page: 1;
    data: PesanCuci[];
    last_page: number;
    per_page: number;
    total: number;
  };
  getPusatPesanCuciDetail: (
    params: any,
    callback: (response: any) => void,
  ) => void;
  submitPusatPesanCuci: (params: any, callback: () => void) => void;
  getCabangPesanCuci: (params: any) => void;
  getCabangPesanCuciDetail: (params: any, callback: () => void) => void;
  submitCabangPesanCuci: (params: any, callback: () => void) => void;
  cabangPesanCuci: {
    current_page: 1;
    data: PesanCuci[];
    last_page: number;
    per_page: number;
    total: number;
  };
  submitTerimaPesanCuci: (params: any, callback: () => void) => void;
  getOrderCuciList: (params: GetOrderListParams) => void;
  getDetailOrderCuci: (params: any, callback: (res: any) => void) => void;
  submitTerimaOrderCuci: (params: any, callback: () => void) => void;
  createOrderCuci: (order: CreateOrderParams, callback: () => void) => void;
  orderCuciList: Order[];
}

export default PurchaseModel;
