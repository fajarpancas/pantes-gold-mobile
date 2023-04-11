import {CommonActions, StackActions} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {preload} from 'react-native-bundle-splitter';
import {NavigationRefType} from '../models/NavigationModel';

class NavigationServices {
  instance: NavigationRefType = null;

  constructor() {
    this.setInstance = this.setInstance.bind(this);
    this.getInstance = this.getInstance.bind(this);
    this.navigate = this.navigate.bind(this);
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.popToTop = this.popToTop.bind(this);
    this.getCurrentRoute = this.getCurrentRoute.bind(this);
  }

  setInstance(instance: NavigationRefType) {
    this.instance = instance;
  }

  navigate(name: string, options: NativeStackNavigationOptions) {
    preload()
      .component(name)
      .finally(() => this.instance?.navigate(name, options));
  }

  push(name: string, options: NativeStackNavigationOptions) {
    preload()
      .component(name)
      .finally(() => {
        const pushAction = StackActions.push(name, options);
        this.instance?.dispatch(pushAction);
      });
  }

  popToTop(callback: () => void) {
    const instanceState = this.instance?.getState();
    if (instanceState && instanceState?.index > 0) {
      const pushActions = StackActions.popToTop();
      this.instance?.dispatch(pushActions);
    }

    if (typeof callback === 'function') {
      callback();
    }
  }

  pop(n?: number) {
    if (this.instance) {
      if (typeof n === 'number') {
        const actions = StackActions.pop(n);
        this.instance.dispatch(actions);
      } else {
        this.instance.goBack();
      }
    }
  }

  setParams(params: object) {
    if (this.instance) {
      this.instance.dispatch(CommonActions.setParams(params));
    }
  }

  getCurrentRoute() {
    if (this.instance) {
      return this.instance.getCurrentRoute();
    }

    return undefined;
  }

  getInstance() {
    if (this.instance) {
      return this.instance;
    }

    return undefined;
  }
}

export default new NavigationServices();
