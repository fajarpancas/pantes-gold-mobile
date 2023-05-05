import React, {PureComponent} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import {connect} from '../../services/ZustandHelper';
import AuthModel from '../../models/AuthModel';
import useAuthStore from '../../stores/auth/AuthStore';
import {LoginParams} from '../../models/apimodel/ApiRequest';

const roleOptions = [
  {
    label: 'Cabang',
    value: 'cabang',
  },
  {
    label: 'Suplier',
    value: 'suplier',
  },
  {
    label: 'Purchase',
    value: 'purchase',
  },
];

type Props = NativeStackScreenProps<AuthStackParams, 'LoginScreen'>;

type FormValue = {
  username: string;
  password: string;
  role: string;
};

class RegisterScreen extends PureComponent<Props> {
  schema: any;

  initialValue: FormValue;

  constructor(props: Props) {
    super(props);

    this.schema = Yup.object().shape({
      username: Yup.string().required('username harus diisi'),
      password: Yup.string().required('password harus diisi'),
      role: Yup.string().required('role harus dipilih'),
    });

    this.initialValue = {
      username: '',
      password: '',
      role: '',
    };

    this.onPressRegister = this.onPressRegister.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  onPressRegister() {
    NavigationServices.navigate('RegisterScreen', {});
  }

  handleSubmit(values) {
    const {username, password} = values;
    const {loginRequest} = this.props;

    loginRequest({username, password});
  }

  renderForm(props: any) {
    return (
      <View>
        <LabelTextInput label="Username" size={12} color={Colors.white} />
        <Spacer height={8} />
        <TextInput
          placeholder="Masukkan username"
          autoCapitalize="none"
          placeholderTextColor={Colors.placeholder}
          style={styles.textInput}
          onChangeText={text => props.setFieldValue('username', text)}
        />
        {props.errors.username ? (
          <Text size={11} color={Colors.error}>
            {props.errors.username}
          </Text>
        ) : null}

        <Spacer height={15} />

        <LabelTextInput label="Password" size={12} color={Colors.white} />
        <Spacer height={8} />
        <TextInput
          placeholder="Masukkan password"
          autoCapitalize="none"
          placeholderTextColor={Colors.placeholder}
          style={styles.textInput}
          secureTextEntry
          onChangeText={text => props.setFieldValue('password', text)}
        />
        {props.errors.password ? (
          <Text size={11} color={Colors.error}>
            {props.errors.password}
          </Text>
        ) : null}

        <Spacer height={15} />
        <LabelTextInput label="Pilih role" size={12} color={Colors.white} />

        <Spacer height={8} />
        <View style={styles.flexRowBetween}>
          {roleOptions.map(r => {
            const isSelected = props.values.role === r.value;
            return (
              <TouchableOpacity
                onPress={() => props.setFieldValue('role', r.value)}
                activeOpacity={0.8}
                style={[
                  styles.option,
                  isSelected ? styles.bgPrimary : styles.bgWhite,
                ]}>
                <Text
                  color={isSelected ? Colors.white : Colors.fontBlack}
                  family={isSelected ? 'bold' : 'regular'}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {props.errors.role ? (
          <Text size={11} color={Colors.error}>
            {props.errors.role}
          </Text>
        ) : null}

        <Spacer height={27} />
        <Button
          title="Register"
          color={Colors.primary}
          onPress={props.handleSubmit}
        />
        <Spacer height={20} />
        <View style={styles.flexRow}>
          <Text size={10} color={Colors.white}>
            Sudah punya akun?
          </Text>
          <Spacer width={5} />
          <TouchableOpacity
            onPress={() => NavigationServices.pop()}
            style={styles.registerButton}>
            <Text color={'#1ebbd7'} size={10} family="bold">
              Kembali ke halaman login
            </Text>
          </TouchableOpacity>
        </View>
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
              {/* <Image source={Images.iconLogo} style={styles.logoStyle} /> */}

              {/* <Spacer height={63} /> */}
              <View style={styles.paddingHorizontal47}>
                <Text size={12} family="semiBold" color={Colors.white}>
                  Pendaftaran akun baru.
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
    color: Colors.black,
  },
  registerButton: {
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    borderRadius: scale(8),
    marginRight: scale(10),
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  bgPrimary: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.white,
  },
});

const authSelector = (state: AuthModel) => ({
  loginRequest: (params: LoginParams) => state.loginRequest(params),
});

const stores = [{store: useAuthStore, selector: authSelector}];

export default connect(stores)(RegisterScreen);
