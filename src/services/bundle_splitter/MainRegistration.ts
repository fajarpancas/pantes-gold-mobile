import {register} from 'react-native-bundle-splitter';

export const HomeScreen = register({
  loader: () => require('../../screens/main/HomeScreen'),
  name: 'HomeScreen',
});

export const MoreScreen = register({
  loader: () => require('../../screens/main/MoreScreen'),
  name: 'MoreScreen',
});
