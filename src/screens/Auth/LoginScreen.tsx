import React, {PureComponent} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../models/NavigationModel';
import GlobalStyles from '../../themes/GlobalStyles';
import {scale} from '../../services/Scale';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import NavigationServices from '../../services/NavigationServices';
import {authStore} from '../../stores/auth/AuthStore';

type Props = NativeStackScreenProps<AuthStackParams, 'LoginScreen'>;

const styles = StyleSheet.create({
  contentContainer: {
    width: '80%',
  },
  labelTitle: {
    fontSize: scale(15),
  },
});

class LoginScreen extends PureComponent<Props> {
  email: string = '';
  password: string = '';

  constructor(props: Props) {
    super(props);

    if (__DEV__) {
      this.email = 'eve.holt@reqres.in';
      this.password = 'cityslicka';
    }

    this.onPressLogin = this.onPressLogin.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
  }

  onPressLogin() {
    // Call auth action directly here, no need to include into selectors
    authStore
      .getState()
      .loginRequest({email: this.email, password: this.password});
  }

  onPressRegister() {
    NavigationServices.navigate('RegisterScreen', {});
  }

  render(): React.ReactNode {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.center]}>
        <View style={styles.contentContainer}>
          <TextInput
            style={GlobalStyles.textInput}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={email => (this.email = email)}
            defaultValue={this.email}
          />
          <Spacer height={scale(15)} />
          <TextInput
            style={GlobalStyles.textInput}
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
            onChangeText={password => (this.password = password)}
            defaultValue={this.password}
          />
          <Spacer height={scale(20)} />
          <Button title="Login" onPress={this.onPressLogin} />
          <Spacer height={scale(10)} />
          <View style={GlobalStyles.center}>
            <Text style={styles.labelTitle}>OR</Text>
          </View>
          <Spacer height={scale(10)} />
          <Button title="Register Now" onPress={this.onPressRegister} />
        </View>
      </View>
    );
  }
}

export default LoginScreen;
