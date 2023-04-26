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

class AddOrderScreen extends React.PureComponent {
  constructor(props: any) {
    super(props);

    this.state = {
      qty: 1,
      type: null,
    };
  }
  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <HeaderCabang />
        <Spacer height={30} />
        <ScrollView style={styles.padding20}>
          <TouchableOpacity activeOpacity={0.8} style={styles.uploadContainer}>
            <Image source={Images.iconCamera} style={styles.icCamera} />
            <Spacer height={5} />
            <Text size={14} family="bold">
              Tap untuk mengunggah foto
            </Text>
          </TouchableOpacity>

          <Spacer height={20} />
          <LabelTextInput label="Quantity" size={12} />
          <Spacer height={5} />
          <View style={styles.qtyWrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={this.state.qty === 0}
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
            />
            <View style={styles.rightLabel}>
              <Text family="bold" color={Colors.primary}>
                Karat
              </Text>
            </View>
          </View>

          <Spacer height={15} />
          <LabelTextInput label="Berat emas" size={12} />
          <Spacer height={5} />
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan berat emas"
              placeholderTextColor={Colors.placeholder}
              keyboardType="number-pad"
            />
            <View style={styles.rightLabel}>
              <Text family="bold" color={Colors.primary}>
                gram
              </Text>
            </View>
          </View>

          <Spacer height={15} />
          <LabelTextInput label="Jenis pesan" size={12} />
          <Spacer height={5} />
          <View style={styles.optionContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({type: 'beli'})}
              style={[
                styles.optionWrapper,
                this.state.type === 'beli' ? styles.selectedColor : {},
              ]}>
              <Text
                size={14}
                color={
                  this.state.type === 'beli' ? Colors.white : Colors.fontBlack
                }>
                Beli
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({type: 'cuci'})}
              style={[
                styles.optionWrapper,
                this.state.type === 'cuci' ? styles.selectedColor : {},
              ]}>
              <Text
                size={14}
                color={
                  this.state.type === 'cuci' ? Colors.white : Colors.fontBlack
                }>
                Cuci
              </Text>
            </TouchableOpacity>
          </View>
          <Spacer height={40} />
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <Button title="Submit Pesanan" color={Colors.primary} />
          <Spacer height={10} />
          <Button
            onPress={() => NavigationServices.pop()}
            title="Kembali ke Home"
            color={Colors.white}
            border={Colors.primary}
            titleColor={Colors.primary}
          />
        </View>
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
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderTopColor: Colors.outlineBase,
    borderTopWidth: 1,
  },
});

export default AddOrderScreen;
