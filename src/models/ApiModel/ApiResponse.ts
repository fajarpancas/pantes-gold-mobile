import {ApiErrorResponse, ApiOkResponse} from 'apisauce';

export type ApiErrorResponseType = {
  error: string;
};

export type LoginResponse =
  | ApiErrorResponse<ApiErrorResponseType>
  | ApiOkResponse<{token: string}>;
