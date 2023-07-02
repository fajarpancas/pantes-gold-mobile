import produce from 'immer';
import UserModel from '../../models/UserModel';
import ApiServices from '../../services/ApiServices';
import {sessionStore} from '../session/SessionStore';
import {
  CreateOfferParams,
  CreateOrderParams,
  GetOfferListParams,
  GetOrderListParams,
} from '../../models/apimodel/ApiRequest';

const UserActions = (set, get) => {
  return {
    setUser: (user: {
      username: string;
      token_user: string;
      id_role: number;
      name_role: string;
      nama_toko: string;
    }) => {
      console.tron.error({user});
      set(
        produce((state: UserModel) => {
          state.user = user;
        }),
      );
    },
    getHome: async () => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getHome();
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.homeData = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    createOrder: async (
      orderParams: CreateOrderParams,
      callback: () => void,
    ) => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.createOrder(orderParams);
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              callback();
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getCabang: async (params: any) => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getCabang(params);
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.cabang = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getOrderList: async (params: GetOrderListParams) => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getOrderList(params);
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              if (response?.data?.data) {
                const tempData = state.orderList?.data;
                let newData = response?.data?.data?.data;

                if (params?.page > 1) {
                  newData = tempData?.concat(newData);
                }

                state.orderList = {...response.data.data, data: newData};
              }
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getOfferList: async (params: GetOfferListParams) => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getOfferList(params);
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              if (response?.data?.data) {
                const tempData = state.offerList?.data;
                let newData = response?.data?.data?.data;

                if (params?.page > 1) {
                  newData = tempData?.concat(newData);
                }
                state.offerList = {...response.data.data, data: newData};
              }
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    createOffer: async (
      offerParams: CreateOfferParams,
      callback: () => void,
    ) => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.createOffer(offerParams);
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              callback();
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getCartList: async () => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getCartList();
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.cartList = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getJenisBarang: async () => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getJenisBarang();
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.jenisBarang = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getDetailOrder: async (params: any, callback: (res: any) => void) => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getDetailOrder(params);
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
            }),
          );

          if (typeof callback === 'function') {
            callback(response?.data?.data);
          }
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    submitTerimaCabang: async (params: any, callback: () => void) => {
      set(
        produce((state: UserModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.submitTerimaCabang(params);
        if (response.ok) {
          set(
            produce((state: UserModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: UserModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: UserModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
  };
};

export default UserActions;
