import produce from 'immer';
import ApiServices from '../../services/ApiServices';
import PurchaseModel from '../../models/PurchaseModel';

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
  };
};

export default PurchaseActions;
