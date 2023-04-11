import {createStore} from 'zustand/vanilla';

import {createJSONStorage, persist} from 'zustand/middleware';
import SessionModel from '../../models/SessionModel';
import MMKVServices from '../../services/MMKVServices';
import SessionActions from './SessionActions';
import {useStore} from 'zustand';
import {clearStore} from '../../const/StoreConst';
import {shallow} from 'zustand/shallow';

const InitialStore = {
  isLogin: false,
  token: undefined,
};

export const sessionStore = createStore<SessionModel>()(
  persist(
    set => ({
      ...InitialStore,
      ...SessionActions(set),
      clear: () => clearStore(set, InitialStore),
    }),
    {
      name: 'session-store', // name of item in the storage (must be unique)
      storage: createJSONStorage(() => new MMKVServices('session-store')),
    },
  ),
);

// put shallow to do comparison on nextstate and prevstate
const useSessionStore = (selector: any) =>
  useStore(sessionStore, selector, shallow);

export default useSessionStore;
