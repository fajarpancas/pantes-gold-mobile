export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  password: string;
  id_role: string;
  kd_toko: number;
};

export type ApiRequestModel = {
  loading: boolean;
  error: boolean;
};

export type CreateOrderParams = {
  nama_barang: string;
  qty: number;
  berat: any;
  kadar: number;
  jenis_pesan: string;
  url_foto: string;
};

export type GetOrderListParams = {
  page: number;
  per_page: number;
  search?: string;
  kadar?: number;
  berat?: any;
  qty?: string;
};
