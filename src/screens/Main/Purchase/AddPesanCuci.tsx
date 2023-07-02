import React from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import Spacer from '../../../components/Spacer';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import NavigationServices from '../../../services/NavigationServices';
import Images from '../../../themes/Images';
import LabelTextInput from '../../../components/LabelTextInput';
import Button from '../../../components/Button';
import {openCamera} from '../../../services/CameraHelper';
import SuccessModal from '../../../components/SuccessModal';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Fonts from '../../../themes/Fonts';
import {connect} from '../../../services/ZustandHelper';
import {openImagePicker} from '../../../services/ImagePickerHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import CustomDatePicker from '../../../components/DatePicker';
import dayjs from 'dayjs';
import UserModel from '../../../models/UserModel';
import useUserStore from '../../../stores/user/UserStore';
import ModalSelectJenisBarang from './ModalSelectJenisBarang';

type ImageResponse = {
  path: string;
  filename: string;
  mime: string;
  data: string;
};

class AddPesanCuci extends React.PureComponent {
  schema: any;
  initialValue = __DEV__
    ? {
        productCode: '111',
        productName: 'TEST PRODUCT',
        noPesan: '123412',
        tgl: new Date(),
        type: 'tua',
        jenis: 'anting',
        qty: '8',
      }
    : {
        productCode: '',
        productName: '',
        noPesan: '',
        tgl: new Date(),
        type: '',
        jenis: '',
        qty: '',
      };

  constructor(props: any) {
    super(props);

    this.state = {
      photo: null,
      photoError: false,
      successModal: false,
      selectModalVisible: false,
      modalVisible: false,
      modalJenisVisible: false,
    };

    this.schema = Yup.object().shape({
      productCode: Yup.string().required('Kode Produk harus diisi'),
      productName: Yup.string().required('Nama produk harus diisi'),
      noPesan: Yup.string().required('Nomor pesan harus diisi'),
      tgl: Yup.string(),
      type: Yup.string().required('Kadar harus dipilih'),
      jenis: Yup.object().required('Jenis barang harus diisi'),
      qty: Yup.number()
        .min(1, 'Berat emas hanya boleh angka dan lebih dari 0')
        .required('Berat barang harus diisi'),
    });
  }

  componentDidMount(): void {
    const {getJenisBarang} = this.props;
    getJenisBarang();
  }

  onPressCamera = () => {
    this.setState({selectModalVisible: false});
    setTimeout(() => {
      openCamera(
        {
          mediaType: 'photo',
          compressImageMaxHeight: 720,
          compressImageMaxWidth: 720,
          cropping: true,
          width: scale(640),
          height: scale(370),
          includeBase64: true,
        },
        async (response: ImageResponse) => {
          this.setState({photo: response, photoError: false});
          // onSelect({
          //   uri: `file://${response.path}`,
          //   name: response?.filename || response?.path?.split('/').pop(),
          //   type: response?.mime,
          // });
        },
        (error: any) => {
          console.tron.error({e: error.message});
        },
      );
    }, 800);
  };

  onSelectGallery = () => {
    this.setState({selectModalVisible: false});
    setTimeout(() => {
      openImagePicker(
        {
          mediaType: 'photo',
          compressImageMaxHeight: 720,
          compressImageMaxWidth: 720,
          cropping: true,
          width: scale(640),
          height: scale(370),
          includeBase64: true,
        },
        async (response: ImageResponse) => {
          this.setState({photo: response, photoError: false});
        },
        (error: any) => {
          console.tron.error({e: error.message});
        },
      );
    }, 800);
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  handleSubmit = props => {
    const {photo} = this.state;
    if (!photo) {
      this.setState({photoError: true});
    } else {
      const params = {
        kd_produk: props.productCode,
        no_pesan: props.noPesan,
        nama_barang: props.productName,
        tgl_pesan: dayjs(props.tgl).format('YYYY-MM-DD HH:mm:ss'),
        kadar: props.type,
        jenis_barang: props.jenis?.kd_barang,
        qty: props.qty,
        url_foto: `data:image/jpeg;base64,${photo?.data}`,
      };

      this.props.submitPesanCuci(params, () => {
        this.props.getPesanCuci();
        this.setState({successModal: true});
      });
    }
  };

  renderForm = (props: any) => {
    const {photo} = this.state;

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => this.setState({selectModalVisible: true})}
            activeOpacity={0.8}
            style={styles.uploadContainer}>
            {photo?.path ? (
              <Image
                source={{uri: photo?.path}}
                style={styles.uploadContainer}
              />
            ) : (
              <>
                <Image source={Images.iconCamera} style={styles.icCamera} />
                <Spacer height={5} />
                <Text size={12} family="bold">
                  Tap untuk mengunggah foto
                </Text>
              </>
            )}
          </TouchableOpacity>
          {this.state.photoError ? (
            <Text color={'red'} size={10}>
              Foto tidak boleh kosong
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="Kode Produk" size={12} />
          <Spacer height={5} />
          <View style={styles.textInputWrapper}>
            <TextInput
              style={[
                styles.textInput,
                {width: scale(320), borderRadius: scale(8)},
              ]}
              defaultValue={props.values.productCode}
              placeholder="Masukkan kode produk"
              placeholderTextColor={Colors.placeholder}
              onChangeText={text => props.setFieldValue('productCode', text)}
            />
          </View>
          {props.errors.productCode ? (
            <Text color={'red'} size={10}>
              {props.errors.productCode}
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="No Pesan" size={12} />
          <Spacer height={5} />
          <View style={styles.textInputWrapper}>
            <TextInput
              style={[
                styles.textInput,
                {width: scale(320), borderRadius: scale(8)},
              ]}
              defaultValue={props.values.noPesan}
              placeholder="Masukkan no pesan"
              placeholderTextColor={Colors.placeholder}
              onChangeText={text => props.setFieldValue('noPesan', text)}
            />
          </View>
          {props.errors.noPesan ? (
            <Text color={'red'} size={10}>
              {props.errors.noPesan}
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="Tanggal Pesan" size={12} />
          <Spacer height={5} />
          <CustomDatePicker
            title="Pilih Tanggal Terima Pusat"
            defaultValue={props.values.tgl}
            onSelectDate={d => props.setFieldValue('tgl', d)}
            padding={12}
            bgColor={Colors.white}
          />

          <Spacer height={15} />
          <LabelTextInput label="Nama Barang" size={12} />
          <Spacer height={5} />
          <View style={styles.textInputWrapper}>
            <TextInput
              style={[
                styles.textInput,
                {width: scale(320), borderRadius: scale(8)},
              ]}
              defaultValue={props.values.productName}
              placeholder="Masukkan nama barang"
              placeholderTextColor={Colors.placeholder}
              onChangeText={text => props.setFieldValue('productName', text)}
            />
          </View>
          {props.errors.productName ? (
            <Text color={'red'} size={10}>
              {props.errors.productName}
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="Kadar" size={12} />
          <Spacer height={5} />
          <View style={styles.optionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.setFieldValue('type', 'muda')}
              style={[
                styles.optionWrapper,
                props.values.type === 'muda' ? styles.selectedColor : {},
              ]}>
              <Text
                family={props.values.type === 'muda' ? 'bold' : 'regular'}
                size={14}
                color={
                  props.values.type === 'muda' ? Colors.white : Colors.fontBlack
                }>
                Muda
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.setFieldValue('type', 'tua')}
              style={[
                styles.optionWrapper,
                props.values.type === 'tua' ? styles.selectedColor : {},
              ]}>
              <Text
                family={props.values.type === 'tua' ? 'bold' : 'regular'}
                size={14}
                color={
                  props.values.type === 'tua' ? Colors.white : Colors.fontBlack
                }>
                Tua
              </Text>
            </TouchableOpacity>
          </View>
          {props.errors.type ? (
            <Text color={'red'} size={10}>
              {props.errors.type}
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="Jenis barang" size={12} />
          <Spacer height={5} />

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({modalJenisVisible: true})}
            style={styles.selectCabang}>
            <Text>
              {props.values.jenis?.nama_jenis_barang || 'Pilih jenis barang'}
            </Text>
            <Image
              source={Images.iconDropdown}
              style={{width: scale(24), height: scale(24)}}
            />
          </TouchableOpacity>

          {props.errors.jenis ? (
            <Text color={'red'} size={10}>
              {props.errors.jenis}
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="Qty" size={12} />
          <Spacer height={5} />
          <View style={styles.textInputWrapper}>
            <TextInput
              style={[
                styles.textInput,
                {width: scale(320), borderRadius: scale(8)},
              ]}
              defaultValue={props.values.qty}
              placeholder="Masukkan qty barang"
              placeholderTextColor={Colors.placeholder}
              onChangeText={text => props.setFieldValue('qty', text)}
            />
          </View>
          {props.errors.qty ? (
            <Text color={'red'} size={10}>
              {props.errors.qty}
            </Text>
          ) : null}
        </View>
        <Spacer height={20} />
        <View style={styles.buttonWrapper}>
          <Button
            title="Submit Pesanan"
            onPress={() => {
              props.handleSubmit();
              if (!photo) {
                this.setState({photoError: true});
              }
            }}
            color={Colors.primary}
            loading={this.props.loading}
          />
        </View>
        <Modal visible={this.state.selectModalVisible} transparent>
          <View style={styles.modalBackground} />
          <View style={styles.modalContainer}>
            <View style={styles.modalWrapper}>
              <View style={styles.uploadtWrapper}>
                <Text family="bold" size={16}>
                  Unggah Foto
                </Text>
                <TouchableOpacity
                  onPress={() => this.setState({selectModalVisible: false})}>
                  <Image
                    source={Images.iconClose}
                    style={{width: scale(18), height: scale(18)}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.border}>
                <TouchableOpacity
                  onPress={this.onSelectGallery}
                  style={styles.selectWrapper}>
                  <Image
                    source={Images.iconGallery}
                    style={{
                      width: scale(20),
                      height: scale(20),
                      resizeMode: 'contain',
                    }}
                  />
                  <Spacer width={10} />
                  <Text>Ambil dari galeri</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={this.onPressCamera}
                style={styles.selectWrapper}>
                <Image
                  source={Images.iconCamera}
                  style={{
                    width: scale(20),
                    height: scale(20),
                    resizeMode: 'contain',
                  }}
                />
                <Spacer width={10} />
                <Text>Ambil menggunakan kamera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <ModalSelectJenisBarang
          jenisBarang={this.props.jenisBarang || []}
          modalVisible={this.state.modalJenisVisible}
          onHide={() => this.setState({modalJenisVisible: false})}
          onSelected={c => props.setFieldValue('jenis', c)}
        />
      </View>
    );
  };

  render(): React.ReactNode {
    const {successModal} = this.state;
    return (
      <View style={styles.container}>
        <Spacer height={20} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.padding20}>
          <Formik
            initialValues={this.initialValue}
            onSubmit={this.handleSubmit}
            validationSchema={this.schema}
            validateOnChange={false}>
            {props => this.renderForm(props)}
          </Formik>
        </ScrollView>

        <SuccessModal
          visible={successModal}
          messageTitle="Berhasil membuat pesan cuci baru!"
          messageDesc={'Selamat anda berhasil membuat pesan cuci baru.'}
          onPressOk={() => {
            this.setState({successModal: false});
            NavigationServices.pop();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: scale(360),
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: scale(312),
    paddingHorizontal: scale(24),
    backgroundColor: Colors.white,
    borderRadius: scale(28),
    alignItems: 'center',
  },
  selectWrapper: {
    width: scale(312),
    height: scale(60),
    paddingLeft: scale(30),
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadtWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: scale(312),
    paddingTop: scale(20),
    paddingBottom: scale(10),
    paddingHorizontal: scale(20),
  },
  padding20: {
    paddingHorizontal: scale(20),
  },
  textInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icCamera: {
    width: scale(41),
    height: scale(41),
  },
  uploadContainer: {
    width: scale(320),
    height: scale(185),
    backgroundColor: Colors.greenBg,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
  },
  textInput: {
    width: scale(261),
    borderWidth: 1,
    borderColor: Colors.outlineBase,
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    height: scale(45),
    paddingLeft: scale(20),
    color: Colors.fontBlack,
    fontFamily: Fonts.type.regular,
  },
  optionContainer: {
    flexDirection: 'row',
  },
  optionWrapper: {
    borderWidth: 1,
    borderRadius: scale(8),
    borderColor: Colors.outlineBase,
    width: scale(100),
    height: scale(45),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    marginRight: scale(10),
  },
  selectedColor: {
    backgroundColor: Colors.primary,
  },
  buttonWrapper: {
    paddingVertical: scale(10),
    borderTopColor: Colors.outlineBase,
    borderTopWidth: 1,
  },
  border: {
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: 1,
  },
  dropdown: {
    height: scale(45),
    borderWidth: 1,
    borderColor: Colors.outlineBase,
    borderRadius: scale(8),
    paddingLeft: scale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
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
    borderWidth: 1,
    borderColor: Colors.outlineBase,
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  submitPesanCuci: (params: any, callback: () => void) =>
    state.submitPesanCuci(params, callback),
  getPesanCuci: () => state.getPesanCuci({per_page: 20, page: 1}),
  loading: state.loading,
});

const userSelector = (state: UserModel) => ({
  getJenisBarang: () => state.getJenisBarang(),
  jenisBarang: state.jenisBarang,
});

const stores = [
  {store: usePurchaseStore, selector: purchaseSelector},
  {store: useUserStore, selector: userSelector},
];

export default connect(stores)(AddPesanCuci);
