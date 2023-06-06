import {CreateOffer} from '../stores/purchase/PurchaseTypes';
import StoreModel from './StoreModel';
import {OfferDetailParams, PublishOfferParams} from './apimodel/ApiRequest';

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
  id_pabrik: Number;
  nama_pabrik: String;
  status: Number;
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
}

export default PurchaseModel;
