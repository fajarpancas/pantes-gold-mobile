import {createStore} from 'zustand/vanilla';

import AuthActions from './AuthActions';
import {useStore} from 'zustand';
import AuthModel from '../../models/AuthModel';
import {clearStore} from '../../const/StoreConst';
import {shallow} from 'zustand/shallow';

const InitialStore = {
  loading: false,
  error: false,
};

export const authStore = createStore<AuthModel>()(set => ({
  ...InitialStore,
  ...AuthActions(set),
  clear: () => clearStore(set, InitialStore),
}));

// put shallow to do comparison on nextstate and prevstate
const useAuthStore = (selector: any) => useStore(authStore, selector, shallow);

export default useAuthStore;
