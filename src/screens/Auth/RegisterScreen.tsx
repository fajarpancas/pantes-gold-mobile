import React, {PureComponent} from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
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
import UserModel from '../../models/UserModel';
import useUserStore from '../../stores/user/UserStore';
import {RegisterParams} from '../../models/apimodel/ApiRequest';
import AuthModel from '../../models/AuthModel';
import useAuthStore from '../../stores/auth/AuthStore';

const roleOptions = [
  {
    label: 'Cabang',
    value: '1',
  },
  // {
  //   label: 'Suplier',
  //   value: 'suplier',
  // },
  // {
  //   label: 'Purchase',
  //   value: 'purchase',
  // },
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

    this.state = {
      modalVisible: false,
      cabangSelected: null,
    };

    this.schema = Yup.object().shape({
      username: Yup.string().required('username harus diisi'),
      password: Yup.string().required('password harus diisi'),
      role: Yup.string().required('role harus dipilih'),
      cabangSelected: Yup.object().required('cabang harus dipilih'),
    });

    this.initialValue = {
      username: '',
      password: '',
      role: '1',
      cabangSelected: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    this.props.getCabang();
  };

  handleSubmit(values) {
    const {username, password, role, cabangSelected} = values;
    const params = {
      username,
      password,
      id_role: Number(role),
      kd_toko: cabangSelected?.kd_toko,
    };
    this.props.registerRequest(params);
  }

  renderForm(props: any) {
    const {cabang} = this.props;
    return (
      <View>
        <LabelTextInput label="Username" size={12} color={Colors.white} />
        <Spacer height={8} />
        <TextInput
          placeholder="Masukkan username"
          autoCapitalize="none"
          placeholderTextColor={Colors.placeholder}
          defaultValue={props.values.username}
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
          defaultValue={props.values.password}
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
        <Text color={Colors.white} size={9}>
          (untuk saat ini hanya bisa mendaftar akun role cabang)
        </Text>

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

        <Spacer height={15} />
        <LabelTextInput
          label="Pilih cabang/toko"
          size={12}
          color={Colors.white}
        />

        <Spacer height={8} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.setState({modalVisible: true})}
          style={styles.selectCabang}>
          <Text>
            {props.values.cabangSelected?.nama_toko || 'Pilih cabang/toko'}
          </Text>
          <Image
            source={Images.iconDropdown}
            style={{width: scale(24), height: scale(24)}}
          />
        </TouchableOpacity>
        {props.errors.cabangSelected ? (
          <Text size={11} color={Colors.error}>
            {props.errors.cabangSelected}
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
        <Modal
          visible={this.state.modalVisible}
          animationType="slide"
          transparent>
          <View style={styles.modalBackground} />
          <View style={styles.modalContainer}>
            <View style={styles.modalWrapper}>
              <Spacer height={20} />
              <View style={styles.selectCabangHeader}>
                <Text size={16} family="bold">
                  Pilih Cabang/Toko
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}>
                  <Image
                    source={Images.iconClose}
                    style={{width: scale(18), height: scale(18)}}
                  />
                </TouchableOpacity>
              </View>

              <Spacer height={20} />
              <ScrollView style={{paddingHorizontal: scale(20)}}>
                {cabang?.length
                  ? cabang.map(c => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            props.setFieldValue('cabangSelected', c);
                            this.setState({modalVisible: false});
                          }}
                          style={styles.cabangItem}>
                          <Text>{c.nama_toko}</Text>
                          <Text> ({c.alamat}).</Text>
                        </TouchableOpacity>
                      );
                    })
                  : null}
              </ScrollView>
              <Spacer height={40} />
            </View>
          </View>
        </Modal>
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
                <Text size={16} family="semiBold" color={Colors.white}>
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
  cabangItem: {
    flexDirection: 'row',
    height: scale(40),
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: scale(1),
    alignItems: 'center',
    backgroundColor: Colors.greenBg,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: scale(5),
  },
  selectCabangHeader: {
    marginHorizontal: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectCabang: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: scale(45),
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: scale(360),
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    maxHeight: '80%',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
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

const userSelector = (state: UserModel) => ({
  getCabang: () => state.getCabang(),
  cabang: state.cabang,
});

const authSelector = (state: AuthModel) => ({
  registerRequest: (params: RegisterParams) => state.registerRequest(params),
});

const stores = [
  {store: useUserStore, selector: userSelector},
  {store: useAuthStore, selector: authSelector},
];

export default connect(stores)(RegisterScreen);
