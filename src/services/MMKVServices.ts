import {MMKV} from 'react-native-mmkv';

const MMKV_KEY = '9d988d17-b694-40d3-9456-f77d6ecd2928';

class MMKVServices {
  storage?: any;

  constructor(instanceName: string) {
    this.init = this.init.bind(this);
    this.setItem = this.setItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.init(instanceName);
  }

  init(instanceName: string) {
    this.storage = new MMKV({
      id: instanceName,
      encryptionKey: MMKV_KEY,
    });
  }

  setItem(name: string, value: any) {
    this.storage?.set(name, value);
  }

  removeItem(name: string) {
    this.storage?.delete(name);
  }

  getItem(name: string): string {
    return this.storage?.getString(name);
  }
}

export default MMKVServices;
