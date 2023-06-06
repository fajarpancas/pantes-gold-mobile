import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import HeaderCabang from '../../components/HeaderCabang';
import Images from '../../themes/Images';
import LabelTextInput from '../../components/LabelTextInput';
import Button from '../../components/Button';
import SuccessModal from '../../components/SuccessModal';
import NavigationServices from '../../services/NavigationServices';
import UserModel from '../../models/UserModel';
import {CreateOfferParams} from '../../models/apimodel/ApiRequest';
import useUserStore from '../../stores/user/UserStore';
import {connect} from '../../services/ZustandHelper';

class OfferDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      qty: 1,
      successModal: false,
    };
  }

  handleSubmit = params => {
    const {qty} = this.state;
    this.props.createOffer(
      {
        id_penawaran: params.id_penawaran,
        qty,
      },
      () => {
        this.props.getCartList();
        this.setState({successModal: true});
      },
    );
  };

  render(): React.ReactNode {
    const {params} = this.props.route;
    return (
      <View style={styles.bgContainer}>
        <ScrollView>
          <HeaderCabang />
          <View style={styles.container}>
            <Spacer height={30} />
            <Image source={{uri: params?.url_foto}} style={styles.image} />
            <Spacer height={20} />
            <Text family="bold">Nama Barang</Text>
            <Spacer height={5} />
            <Text color={Colors.fontSemiBlack} lineHeight={20}>
              {params?.keterangan_produk}
            </Text>
            {/* <Spacer height={20} />
            <Text family="bold">Deskripsi</Text>
            <Spacer height={5} />
            <Text color={Colors.fontSemiBlack} lineHeight={20}>
              {desc}
            </Text> */}

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
            <Spacer height={20} />
            <Button
              title="Submit Pesanan"
              onPress={() => this.handleSubmit(params)}
              color={Colors.primary}
              loading={this.props.loading}
            />
            <Spacer height={30} />
          </View>
        </ScrollView>
        <SuccessModal
          visible={this.state.successModal}
          messageTitle="Submit Pesanan Penawaran Berhasil!"
          messageDesc={`Selamat anda berhasil memesan ${this.state.qty} ${params?.keterangan_produk}.`}
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
  bgContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    paddingHorizontal: scale(20),
  },
  image: {
    width: scale(320),
    height: scale(200),
    resizeMode: 'cover',
    backgroundColor: '#f2f2f2',
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
});

const userSelector = (state: UserModel) => ({
  getCartList: () => state.getCartList(),
  createOffer: (params: CreateOfferParams, callback: () => void) =>
    state.createOffer(params, callback),
  loading: state.loading,
});

const stores = [{store: useUserStore, selector: userSelector}];

export default connect(stores)(OfferDetailScreen);
