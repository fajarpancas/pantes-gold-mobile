import StoreModel from './StoreModel';

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
  setHome: (homeData: {order: Order[]; penawaran: Penawaran[]}) => void;
  getHome: () => void;
}

export default UserModel;
