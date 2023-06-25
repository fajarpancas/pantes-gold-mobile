import produce from 'immer';
import ApiServices from '../../services/ApiServices';
import PurchaseModel from '../../models/PurchaseModel';
import {CreateOffer} from './PurchaseTypes';
import {purchaseStore} from './PurchaseStore';
import {
  CreateOrderParams,
  GetOrderListParams,
  OfferDetailParams,
  PublishOfferParams,
} from '../../models/apimodel/ApiRequest';

const PurchaseActions = (set, get) => {
  return {
    getPurchaseOrder: async (params: string) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getPurchaseOrder(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.purchaseOrder = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getPurchaseOffer: async () => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getPurchaseOffer();
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.purchaseOffer = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    createPurchaseOffer: async (params: CreateOffer, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.createPurchaseOffer(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getPabrik: async () => {
      try {
        const response = await ApiServices.getPabrik();
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.pabrikList = response?.data?.data;
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
          }),
        );
      }
    },
    getOfferDetail: async (
      params: OfferDetailParams,
      callback: (data: any) => void,
    ) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getOfferDetail(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.pabrikList = response?.data?.data;
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback(response?.data?.data);
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    publishOffer: async (
      params: PublishOfferParams,
      callback: (data: any) => void,
    ) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.publishOffer(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback(response?.data);
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getPesanBeli: async () => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getPesanBeli();
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.pesanBeli = response?.data?.data;
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getPesanBeliDetail: async (
      params: {kd_produk: string},
      callback: (response: any) => {},
    ) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getPesanBeliDetail(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            if (response?.data?.data) {
              callback(response?.data?.data);
            }
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    submitQtyPesanBeli: async (
      params: any,
      callback: (response: any) => {},
    ) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.submitQtyPesanBeli(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            if (response?.data?.data) {
              callback(response?.data?.data);
            }
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getPurchaseOrderDetail: async (
      params: any,
      callback: (response: any) => {},
    ) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getPurchaseOrderDetail(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            if (response?.data?.data) {
              callback(response?.data?.data);
            }
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    submitPurchaseOrder: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.submitPurchaseOrder(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getPesanCuci: async () => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getPesanCuci();
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.pesanCuci = response?.data?.data;
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    submitPesanCuci: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.submitPesanCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getPesanCuciDetail: async (params: any, callback: (resp: any) => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getPesanCuciDetail(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback(response?.data?.data);
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getPusatPesanCuci: async (params: any) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getPusatPesanCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.pusatPesanCuci = response?.data?.data;
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getPusatPesanCuciDetail: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getPusatPesanCuciDetail(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback(response?.data?.data);
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    submitPusatPesanCuci: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.submitPusatPesanCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getCabangPesanCuci: async (params: any) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getCabangPesanCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.cabangPesanCuci = response?.data?.data;
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getCabangPesanCuciDetail: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.getCabangPesanCuciDetail(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback(response?.data.data);
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    submitCabangPesanCuci: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.submitCabangPesanCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    submitTerimaPesanCuci: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );
      try {
        const response = await ApiServices.submitTerimaPesanCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.error = true;
              state.loading = false;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.error = true;
            state.loading = false;
          }),
        );
      }
    },
    getDetailOrderCuci: async (params: any, callback: (res: any) => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getDetailOrderCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );

          if (typeof callback === 'function') {
            callback(response?.data?.data);
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    submitTerimaOrderCuci: async (params: any, callback: () => void) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.submitTerimaOrderCuci(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
            }),
          );
          if (typeof callback === 'function') {
            callback();
          }
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
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
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.createOrder(orderParams);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              callback();
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
    getOrderCuciList: async (params: GetOrderListParams) => {
      set(
        produce((state: PurchaseModel) => {
          state.loading = true;
        }),
      );

      try {
        const response = await ApiServices.getOrderCuciList(params);
        if (response.ok) {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              if (response?.data?.data) {
                state.orderCuciList = response.data.data;
              }
            }),
          );
        } else {
          set(
            produce((state: PurchaseModel) => {
              state.loading = false;
              state.error = true;
            }),
          );
          throw response.problem;
        }
      } catch (error) {
        set(
          produce((state: PurchaseModel) => {
            state.loading = false;
            state.error = true;
          }),
        );
      }
    },
  };
};

export default PurchaseActions;
