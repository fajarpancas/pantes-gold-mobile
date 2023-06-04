import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import NavigationServices from '../../../services/NavigationServices';
import HeaderCabang from '../../../components/HeaderCabang';
import UserModel from '../../../models/UserModel';
import useUserStore from '../../../stores/user/UserStore';
import {connect} from '../../../services/ZustandHelper';
import {sessionStore} from '../../../stores/session/SessionStore';
import ApiServices from '../../../services/ApiServices';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import PurchaseOrder from './PurchaseOrder';
import Images from '../../../themes/Images';
import ModalSelectCabang from './ModalSelectCabang';
import FloatingAdd from './FloatingAdd';
import OfferCard from '../../../components/OfferCard';
import Spacer from '../../../components/Spacer';

const TOP_MENU = ['Pesanan\n/Req', 'Pesan\nBeli', 'Beli'];

class MenuOfferScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topMenuSelected: 0,
      modalVisible: false,
      cabangSelected: undefined,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.onRefresh();
    }, 300);
    // sessionStore.getState().setLogin(false);
  }

  onRefresh = () => {
    const {getPurchaseOffer} = this.props;
    getPurchaseOffer();
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
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
    const {loading, purchaseOffer} = this.props;
    const purchaseOfferLists = purchaseOffer?.data || [];

    if (purchaseOfferLists?.length === 0 && loading) {
      return (
        <View style={styles.container}>
          <View style={styles.flexCenter}>
            <ActivityIndicator size={'large'} color={Colors.primary} />
            <Text color={Colors.primary}>Loading data</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
        <Spacer height={30} />
        <View style={{paddingHorizontal: scale(20)}}>
          <Text size={16} family="bold">
            Penawaran
          </Text>
        </View>
        <Spacer height={20} />
        <FlatList
          data={purchaseOfferLists}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.padding,
                index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
              ]}>
              <OfferCard isPurchase item={item} onPress={() => {}} />
            </View>
          )}
          contentContainerStyle={
            purchaseOfferLists?.length
              ? styles.paddingHorizontal
              : styles.emptyContainer
          }
          refreshing={loading}
          onRefresh={this.onRefresh}
          numColumns={3}
          ListEmptyComponent={() => {
            if (!loading) {
              return (
                <View>
                  <Spacer height={60} />
                  <Image source={Images.iconEmpty} style={styles.emptyIcon} />
                  <Text size={16} textAlign="center" lineHeight={21.86}>
                    Belum ada penawaran{'\n'}yang dibuat
                  </Text>
                </View>
              );
            }
            return null;
          }}
        />

        <FloatingAdd
          onPress={() => NavigationServices.navigate('AddPurchaseOffer', {})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  emptyIcon: {
    width: scale(70),
    height: scale(80),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingHorizontal: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  paddingLeft10: {
    paddingLeft: scale(10),
  },
  padding: {
    paddingVertical: scale(5),
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPurchaseOffer: () => state.getPurchaseOffer(),
  purchaseOffer: state.purchaseOffer,
  loading: state.loading,
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(MenuOfferScreen);
