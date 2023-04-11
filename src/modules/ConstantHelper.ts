import {NativeModules} from 'react-native';

const ConstantHelper = NativeModules.ConstantHelper;

export const getConstantForKey = (key: string) => {
  return ConstantHelper.getConstantForKey(key);
};
