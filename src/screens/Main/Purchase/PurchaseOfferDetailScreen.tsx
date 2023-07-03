import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import {connect} from '../../../services/ZustandHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Images from '../../../themes/Images';
import Spacer from '../../../components/Spacer';
import {
  OfferDetailParams,
  PublishOfferParams,
} from '../../../models/apimodel/ApiRequest';
import ModalMutipleSelectCabang from './ModalMultipleSelectCabang';
import useUserStore from '../../../stores/user/UserStore';
import UserModel from '../../../models/UserModel';
import Button from '../../../components/Button';
import DropdownAlertHolder from '../../../services/DropdownAlertHolder';
import SuccessModal from '../../../components/SuccessModal';
import NavigationServices from '../../../services/NavigationServices';

class PurchaseOfferDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      offerDetail: undefined,
      cabangSelected: [],
      successModal: false,
      isSubmitted: false,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    const {getOfferDetail, getCabang, route} = this.props;
    const {params} = route;

    getOfferDetail({id_penawaran: params?.id_penawaran}, (response: any) => {
      this.setState({offerDetail: response});
      if (response?.penawaran_toko?.length > 0) {
        this.setState({isSubmitted: true});
      }
    });
    getCabang();
  };

  submit = () => {
    const {route, publishOffer} = this.props;
    const {cabangSelected} = this.state;
    const {params} = route;

    if (!cabangSelected?.length) {
      DropdownAlertHolder.showError('Gagal', 'Piling cabang terlebih dahulu');
    } else {
      const cabangIds = cabangSelected?.map(d => d.kd_toko);
      const cabangJoin = cabangIds?.join(',');

      const body = {
        id_penawaran: params?.id_penawaran,
        kd_toko: cabangJoin,
      };

      publishOffer(body, () => {
        this.setState({successModal: true});
      });
    }
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <View style={styles.flexCenter}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
          <Text color={Colors.primary}>Loading data</Text>
        </View>
      </View>
    );
  };

  render(): React.ReactNode {
    const {loading, cabang} = this.props;
    const {
      offerDetail,
      cabangSelected,
      modalVisible,
      successModal,
      isSubmitted,
    } = this.state;
    const cabangNameSubmitted = offerDetail?.penawaran_toko?.map(
      d => d.nama_toko,
    );
    const cabangName = cabangSelected?.map(d => d.nama_toko);
    const cabangJoin = isSubmitted
      ? cabangNameSubmitted?.join(', ')
      : cabangName?.join(', ');

    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
          <Spacer height={30} />
          <View style={{paddingHorizontal: scale(20)}}>
            <Image source={{uri: offerDetail?.url_foto}} style={styles.image} />

            <Spacer height={20} />
            <View style={styles.rowBetween}>
              <Text family="bold">Kode Produk</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {offerDetail?.kd_produk}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Keterangan Produk</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {offerDetail?.keterangan_produk}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Pabrik</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {offerDetail?.nama_pabrik}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Koleksi</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {offerDetail?.koleksi}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Warna</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {offerDetail?.warna || '-'}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Jenis</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {offerDetail?.jenis || '-'}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />
            <Text family="bold">Deskripsi</Text>
            <Spacer height={10} />
            <Text color={Colors.fontSemiBlack} lineHeight={20}>
              {offerDetail?.deskripsi}
            </Text>

            <Spacer height={10} />
            <Text family="bold">Cabang</Text>
            <Spacer height={10} />
            <TouchableOpacity
              disabled={isSubmitted}
              activeOpacity={0.8}
              onPress={() => this.setState({modalVisible: true})}
              style={styles.selectionWrapper}>
              <View style={{flex: 1}}>
                <Text>{cabangJoin?.length ? cabangJoin : 'Pilih Cabang'}</Text>
              </View>
              {!isSubmitted ? (
                <Image
                  source={Images.iconDropdown}
                  style={{
                    height: scale(20),
                    width: scale(20),
                  }}
                />
              ) : null}
            </TouchableOpacity>
          </View>
          <Spacer height={40} />
          {!isSubmitted ? (
            <View style={{marginHorizontal: scale(20)}}>
              <Button
                title="Submit"
                onPress={this.submit}
                color={Colors.primary}
                loading={loading}
              />
            </View>
          ) : null}
          <Spacer height={20} />
          <ModalMutipleSelectCabang
            cabang={cabang}
            selected={cabangSelected}
            modalVisible={modalVisible}
            onHide={() => this.setState({modalVisible: false})}
            onSelected={c => {
              this.setState({cabangSelected: c});
            }}
          />
          <SuccessModal
            visible={successModal}
            messageTitle="Penawaran berhasil di distribusikan!"
            messageDesc={
              'Selamat penawaran anda berhasil di distribusikan ke cabang.'
            }
            btnMessage="Ok"
            onPressOk={() => {
              this.setState({successModal: false});
              this.onRefresh();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(320),
    height: scale(200),
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: 0.6,
  },
  selectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: 1,
    paddingBottom: scale(10),
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  getOfferDetail: (
    params: OfferDetailParams,
    callback: (response: any) => void,
  ) => state.getOfferDetail(params, callback),
  loading: state.loading,
  publishOffer: (params: PublishOfferParams, callback: () => void) =>
    state.publishOffer(params, callback),
});

const userSelector = (state: UserModel) => ({
  getCabang: () => state.getCabang(),
  cabang: state.cabang,
});

const stores = [
  {store: usePurchaseStore, selector: purchaseSelector},
  {store: useUserStore, selector: userSelector},
];

export default connect(stores)(PurchaseOfferDetailScreen);
