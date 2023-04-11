import {NativeModules} from 'react-native';

const SplashScreen = NativeModules.SplashScreen;

function show() {
  SplashScreen?.show();
}

function hide() {
  SplashScreen?.hide();
}

export default {
  show,
  hide,
};
