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

interface PurchaseModel extends StoreModel {
  loading: boolean;
  error: boolean;
  purchaseOrder: {
    current_page: 1;
    data: Order;
    last_page: number;
    per_page: number;
    total: number;
  };
  getPurchaseOrder: (params: string) => void;
}

export default PurchaseModel;
