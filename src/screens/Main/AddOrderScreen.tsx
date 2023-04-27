import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import NavigationServices from '../../services/NavigationServices';
import HeaderCabang from '../../components/HeaderCabang';
import Images from '../../themes/Images';
import LabelTextInput from '../../components/LabelTextInput';
import Button from '../../components/Button';
import {openCamera} from '../../services/CameraHelper';
import SuccessModal from '../../components/SuccessModal';
import {Formik} from 'formik';
import * as Yup from 'yup';

type ImageResponse = {
  path: string;
  filename: string;
  mime: string;
  data: string;
};

class AddOrderScreen extends React.PureComponent {
  schema: any;

  constructor(props: any) {
    super(props);

    this.state = {
      qty: 1,
      photo: null,
      photoError: false,
      successModal: false,
    };

    this.schema = Yup.object().shape({
      kadar: Yup.number()
        .min(1, 'Nilai kadar emas hanya boleh angka dan lebih dari 0')
        .required('Kadar emas harus diisi'),
      weight: Yup.number()
        .min(1, 'Nilai berat emas hanya boleh angka dan lebih dari 0')
        .required('Berat emas harus diisi'),
      type: Yup.string().required('Jenis pesan harus dipilih'),
    });
  }

  onPressCamera = () => {
    setTimeout(() => {
      openCamera(
        {
          mediaType: 'photo',
          compressImageMaxHeight: 720,
          compressImageMaxWidth: 720,
          cropping: true,
          width: scale(720),
          height: scale(720),
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

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  handleSubmit = props => {
    const {photo} = this.state;
    if (!photo) {
      this.setState({photoError: true});
    } else {
      this.setState({successModal: true});
    }
  };

  renderForm = (props: any) => {
    const {photo} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={this.onPressCamera}
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

          <Spacer height={20} />
          <LabelTextInput label="Quantity" size={12} />
          <Spacer height={5} />
          <View style={styles.qtyWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={this.state.qty === 1}
              onPress={() => this.setState({qty: this.state.qty - 1})}>
              <Image source={Images.iconMinus} style={styles.icAddRemove} />
            </TouchableOpacity>
            <View style={styles.qtyValueWrapper}>
              <Text size={14}>{this.state.qty}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({qty: this.state.qty + 1})}>
              <Image source={Images.iconPlus} style={styles.icAddRemove} />
            </TouchableOpacity>
          </View>

          <Spacer height={15} />
          <LabelTextInput label="Kadar emas" size={12} />
          <Spacer height={5} />
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan kadar emas"
              placeholderTextColor={Colors.placeholder}
              keyboardType="number-pad"
              onChangeText={text => props.setFieldValue('kadar', text)}
            />
            <View style={styles.rightLabel}>
              <Text family="bold" color={Colors.primary}>
                Karat
              </Text>
            </View>
          </View>
          {props.errors.kadar ? (
            <Text color={'red'} size={10}>
              {props.errors.kadar}
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="Berat emas" size={12} />
          <Spacer height={5} />
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan berat emas"
              placeholderTextColor={Colors.placeholder}
              keyboardType="number-pad"
              onChangeText={text => props.setFieldValue('weight', text)}
            />
            <View style={styles.rightLabel}>
              <Text family="bold" color={Colors.primary}>
                gram
              </Text>
            </View>
          </View>
          {props.errors.weight ? (
            <Text color={'red'} size={10}>
              {props.errors.weight}
            </Text>
          ) : null}

          <Spacer height={15} />
          <LabelTextInput label="Jenis pesan" size={12} />
          <Spacer height={5} />
          <View style={styles.optionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.setFieldValue('type', 'beli')}
              style={[
                styles.optionWrapper,
                props.values.type === 'beli' ? styles.selectedColor : {},
              ]}>
              <Text
                family={props.values.type === 'beli' ? 'bold' : 'regular'}
                size={14}
                color={
                  props.values.type === 'beli' ? Colors.white : Colors.fontBlack
                }>
                Beli
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.setFieldValue('type', 'cuci')}
              style={[
                styles.optionWrapper,
                props.values.type === 'cuci' ? styles.selectedColor : {},
              ]}>
              <Text
                family={props.values.type === 'cuci' ? 'bold' : 'regular'}
                size={14}
                color={
                  props.values.type === 'cuci' ? Colors.white : Colors.fontBlack
                }>
                Cuci
              </Text>
            </TouchableOpacity>
          </View>
          {props.errors.type ? (
            <Text color={'red'} size={10}>
              {props.errors.type}
            </Text>
          ) : null}
          <Spacer height={20} />
        </View>
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
          />
        </View>
      </View>
    );
  };

  render(): React.ReactNode {
    const {successModal} = this.state;
    return (
      <View style={styles.container}>
        <HeaderCabang />
        <Spacer height={30} />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.padding20}>
          <Formik
            initialValues={{}}
            onSubmit={this.handleSubmit}
            validationSchema={this.schema}
            validateOnChange={false}>
            {props => this.renderForm(props)}
          </Formik>
        </ScrollView>

        <SuccessModal
          visible={successModal}
          messageTitle="Submit Pesanan Berhasil!"
          messageDesc="Selamat anda berhasil membuat 2 pesanan."
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
  padding20: {
    paddingHorizontal: scale(20),
  },
  listWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  paddingLeft10: {
    paddingLeft: scale(10),
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  icAddRemove: {
    width: scale(36),
    height: scale(36),
  },
  qtyWrapper: {
    flexDirection: 'row',
  },
  qtyValueWrapper: {
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: Colors.outlineBase,
    width: scale(222),
    height: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(14),
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
  },
  rightLabel: {
    width: scale(59),
    borderTopColor: Colors.outlineBase,
    borderBottomColor: Colors.outlineBase,
    borderRightColor: Colors.outlineBase,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    height: scale(45),
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default AddOrderScreen;
