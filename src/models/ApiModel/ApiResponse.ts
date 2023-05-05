import {ApiErrorResponse, ApiOkResponse} from 'apisauce';

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

export type ApiErrorResponseType = {
  error: string;
};

export type LoginResponse =
  | ApiErrorResponse<ApiErrorResponseType>
  | ApiOkResponse<{
      status: boolean;
      message: string;
      data: {
        username: string;
        token_user: string;
        id_role: number;
        name_role: string;
        nama_toko: string;
      };
    }>;

export type GetHomeResponse =
  | ApiErrorResponse<ApiErrorResponseType>
  | ApiOkResponse<{
      status: boolean;
      message: string;
      data: {
        order: Order[];
        penawaran: Penawaran[];
      };
    }>;
