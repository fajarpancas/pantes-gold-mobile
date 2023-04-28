import {ApiErrorResponse, ApiOkResponse} from 'apisauce';

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
