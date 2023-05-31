// import create from 'zustand';
import {createStore} from 'zustand/vanilla';

import {createJSONStorage, persist} from 'zustand/middleware';
import MMKVServices from '../../services/MMKVServices';
import {useStore} from 'zustand';
import {clearStore} from '../../const/StoreConst';
import {shallow} from 'zustand/shallow';
import PurchaseActions from './PurchaseActions';
import PurchaseModel from '../../models/PurchaseModel';

const InitialStore = {
  loading: false,
  error: false,
};

export const purchaseStore = createStore<PurchaseModel>()(
  persist(
    (set, get) => ({
      ...InitialStore,
      ...PurchaseActions(set, get),
      clear: () => clearStore(set, InitialStore),
    }),
    {
      name: 'purchase-store', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => new MMKVServices('purchase-store')),
    },
  ),
);

// put shallow to do comparison on nextstate and prevstate
const usePurchaseStore = (selector: any) =>
  useStore(purchaseStore, selector, shallow);

export default usePurchaseStore;
