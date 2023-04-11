import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
} from '../services/bundle_splitter/AuthRegistration';
import {AuthStackParams} from '../models/NavigationModel';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
