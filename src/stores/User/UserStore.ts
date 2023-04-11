// import create from 'zustand';
import {createStore} from 'zustand/vanilla';

import {createJSONStorage, persist} from 'zustand/middleware';
import UserModel from '../../models/UserModel';
import MMKVServices from '../../services/MMKVServices';
import UserActions from './UserActions';
import {useStore} from 'zustand';
import {clearStore} from '../../const/StoreConst';
import {shallow} from 'zustand/shallow';

const InitialStore = {
  user: undefined,
};

export const userStore = createStore<UserModel>()(
  persist(
    (set, get) => ({
      ...InitialStore,
      ...UserActions(set, get),
      clear: () => clearStore(set, InitialStore),
    }),
    {
      name: 'user-store', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => new MMKVServices('user-store')),
    },
  ),
);

// put shallow to do comparison on nextstate and prevstate
const useUserStore = (selector: any) => useStore(userStore, selector, shallow);

export default useUserStore;
