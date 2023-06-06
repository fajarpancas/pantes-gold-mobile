import produce from 'immer';
import ApiServices from '../../services/ApiServices';
import PurchaseModel from '../../models/PurchaseModel';
import {CreateOffer} from './PurchaseTypes';
import {purchaseStore} from './PurchaseStore';
import {
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
  };
};

export default PurchaseActions;
