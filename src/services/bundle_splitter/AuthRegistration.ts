import {register} from 'react-native-bundle-splitter';

export const LoginScreen = register({
  loader: () => require('../../screens/auth/LoginScreen'),
  name: 'LoginScreen',
});

export const RegisterScreen = register({
  loader: () => require('../../screens/auth/RegisterScreen'),
  name: 'RegisterScreen',
});
