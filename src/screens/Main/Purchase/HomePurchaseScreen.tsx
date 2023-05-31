import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import Spacer from '../../../components/Spacer';
import OrderCard from '../../../components/OrderCard';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import OfferCard from '../../../components/OfferCard';
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

type Penawaran = {
  id_penawaran: number;
  url_foto: string;
  keterangan_produk: string;
};

const TOP_MENU = ['Pesanan\n/Req', 'Pesan\nBeli', 'Beli'];

class HomePurchaseScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topMenuSelected: 0,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      const token = sessionStore.getState().token;
      if (token) {
        ApiServices.setHeader('Authorization', `Bearer ${token}`);
      }
      this.onRefresh();
    }, 300);
    // sessionStore.getState().setLogin(false);
  }

  onRefresh = () => {
    const {getPurchaseOrder} = this.props;
    const {topMenuSelected} = this.state;
    if (topMenuSelected === 0) {
      getPurchaseOrder();
    }
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  render(): React.ReactNode {
    const {loading, purchaseOrder} = this.props;
    // if (loading) {
    //   return (
    //     <View style={styles.container}>
    //       <HeaderCabang />
    //       <View style={styles.flexCenter}>
    //         <ActivityIndicator size={'large'} color={Colors.primary} />
    //         <Text color={Colors.primary}>Loading data</Text>
    //       </View>
    //     </View>
    //   );
    // }

    // if (homeData?.penawaran?.length === 0 && homeData?.order?.length === 0) {
    //   return (
    //     <View style={styles.flexCenter}>
    //       <Text color={Colors.primary}>Belum ada data</Text>
    //     </View>
    //   );
    // }

    const {topMenuSelected} = this.state;

    const purchaseOrderLists = purchaseOrder?.data || [];

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl onRefresh={this.onRefresh} refreshing={loading} />
          }>
          <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

          <View style={styles.menuWrapper}>
            {TOP_MENU.map((menu: string, index: number) => {
              const isSelected = index === topMenuSelected;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    this.setState({topMenuSelected: index}, () => {
                      this.onRefresh();
                    });
                  }}
                  style={[
                    styles.menuBox,
                    {
                      backgroundColor: isSelected
                        ? Colors.greenlight
                        : Colors.greenBg,
                    },
                  ]}>
                  <Text
                    textAlign="center"
                    family={isSelected ? 'bold' : 'regular'}>
                    {menu}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {topMenuSelected === 0 ? (
            <>
              <PurchaseOrder loading={loading} data={purchaseOrderLists} />
            </>
          ) : null}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(30),
    marginHorizontal: scale(20),
  },
  menuBox: {
    width: scale(100),
    height: scale(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPurchaseOrder: (params: string) => state.getPurchaseOrder(params),
  purchaseOrder: state.purchaseOrder,
  loading: state.loading,
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(HomePurchaseScreen);
