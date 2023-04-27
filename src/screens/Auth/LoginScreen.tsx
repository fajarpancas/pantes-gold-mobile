import React, {PureComponent} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../models/NavigationModel';
import {scale} from '../../services/Scale';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import NavigationServices from '../../services/NavigationServices';
import LabelTextInput from '../../components/LabelTextInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Images from '../../themes/Images';
import Text from '../../components/Text';
import Colors from '../../themes/Colors';

type Props = NativeStackScreenProps<AuthStackParams, 'LoginScreen'>;

type FormValue = {
  username: string;
  password: string;
};

class LoginScreen extends PureComponent<Props> {
  schema: any;

  initialValue: FormValue;

  constructor(props: Props) {
    super(props);

    this.schema = Yup.object().shape({
      username: Yup.string().required('username required'),
      password: Yup.string().required('password required'),
    });

    this.initialValue = {
      username: '',
      password: '',
    };

    this.onPressRegister = this.onPressRegister.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  onPressRegister() {
    NavigationServices.navigate('RegisterScreen', {});
  }

  handleSubmit(props) {
    console.error({props});
  }

  renderForm(props: any) {
    return (
      <View>
        <LabelTextInput label="Username" size={12} color={Colors.white} />
        <Spacer height={8} />
        <TextInput
          placeholder="Masukkan username"
          placeholderTextColor={Colors.placeholder}
          style={styles.textInput}
          onChangeText={text => props.setFieldValue('username', text)}
        />
        {props.errors.username ? (
          <Text color={Colors.error}>{props.errors.username}</Text>
        ) : null}

        <Spacer height={15} />

        <LabelTextInput label="Password" size={12} color={Colors.white} />
        <Spacer height={8} />
        <TextInput
          placeholder="Masukkan password"
          placeholderTextColor={Colors.placeholder}
          style={styles.textInput}
          onChangeText={text => props.setFieldValue('password', text)}
        />
        {props.errors.password ? (
          <Text color={Colors.error}>{props.errors.password}</Text>
        ) : null}

        <Spacer height={27} />
        <Button
          title="Masuk"
          color={Colors.primary}
          onPress={props.handleSubmit}
        />
      </View>
    );
  }

  render(): React.ReactNode {
    return (
      <ImageBackground source={Images.authBg} style={styles.container}>
        <StatusBar backgroundColor={'#4c9881'} />
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={[styles.container, styles.paddingTop64]}>
              <Image source={Images.iconLogo} style={styles.logoStyle} />

              <Spacer height={63} />
              <View style={styles.paddingHorizontal47}>
                <Text size={12} family="semiBold" color={Colors.white}>
                  Selamat datang di aplikasi Pantes Gold Silahkan masuk.
                </Text>
                <Spacer height={17} />
                <Formik
                  initialValues={this.initialValue}
                  onSubmit={this.handleSubmit}
                  validationSchema={this.schema}
                  validateOnChange={false}>
                  {props => this.renderForm(props)}
                </Formik>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoStyle: {
    width: scale(140),
    height: scale(63),
    alignSelf: 'center',
  },
  paddingTop64: {
    paddingTop: scale(64),
  },
  paddingHorizontal47: {
    paddingHorizontal: scale(40),
  },
  textInput: {
    width: scale(280),
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
  },
});

export default LoginScreen;
