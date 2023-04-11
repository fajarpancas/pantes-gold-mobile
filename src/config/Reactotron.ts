// import Config from '../Config/DebugConfig';
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // Let's clear Reactotron on every time we load the app
  Reactotron?.clear();

  // https://github.com/infinitered/reactotron for more options!
  Reactotron.configure({name: 'VSBoilerPlateV2'})
    // Reactotron.configure({name: 'VirtualSpace'})
    .useReactNative()
    .connect();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron;
}
