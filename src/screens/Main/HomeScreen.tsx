import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import OrderCard from '../../components/OrderCard';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import OfferCard from '../../components/OfferCard';
import NavigationServices from '../../services/NavigationServices';
import HeaderCabang from '../../components/HeaderCabang';
import UserModel from '../../models/UserModel';
import useUserStore from '../../stores/user/UserStore';
import {connect} from '../../services/ZustandHelper';

type Order = {
  id_order: number;
  url_foto: string;
  nama_barang: string;
  qty: number;
  kadar: string;
  berat: string;
  created_at: string;
  status: number;
};

type Penawaran = {
  id_penawaran: number;
  url_foto: string;
  keterangan_produk: string;
};

class HomeScreen extends React.PureComponent {
  componentDidMount(): void {
    const {getHome} = this.props;
    getHome();
  }
  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  render(): React.ReactNode {
    const {loading, homeData} = this.props;

    if (loading) {
      return (
        <View style={styles.flexCenter}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
          <Text color={Colors.primary}>Loading data</Text>
        </View>
      );
    }

    if (homeData?.penawaran?.length === 0 && homeData?.order?.length === 0) {
      return (
        <View style={styles.flexCenter}>
          <Text color={Colors.primary}>Belum ada data</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

        <HeaderCabang />
        <Spacer height={30} />
        {homeData?.order?.length && (
          <>
            <View style={[styles.padding20, styles.flexRow]}>
              <Text size={16} family="bold">
                Pesanan
              </Text>
              <TouchableOpacity onPress={this.navigate} activeOpacity={0.8}>
                <Text size={12} family="semiBold" color={Colors.primary}>
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer height={10} />
            <View style={styles.listWrapper}>
              {homeData?.order.map((item: Order, index: number) => {
                return (
                  <View style={index !== 0 ? styles.paddingLeft10 : {}}>
                    <OrderCard
                      item={item}
                      onPress={() =>
                        NavigationServices.navigate('OrderDetailScreen', item)
                      }
                    />
                  </View>
                );
              })}
            </View>
          </>
        )}

        {homeData?.penawaran?.length && (
          <>
            <Spacer height={25} />
            <View style={[styles.padding20, styles.flexRow]}>
              <Text size={16} family="bold">
                Penawaran
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => NavigationServices.navigate('OfferScreen', {})}>
                <Text size={12} family="semiBold" color={Colors.primary}>
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer height={10} />
            <View style={styles.listWrapper}>
              {homeData?.penawaran.map((item, index) => {
                return (
                  <View style={index !== 0 ? styles.paddingLeft10 : {}}>
                    <OfferCard
                      item={item}
                      onPress={() =>
                        NavigationServices.navigate('OfferDetailScreen', item)
                      }
                      hideStatus
                    />
                  </View>
                );
              })}
            </View>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  paddingLeft10: {
    paddingLeft: scale(10),
  },
  padding20: {
    paddingHorizontal: scale(20),
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

const userSelector = (state: UserModel) => ({
  getHome: () => state.getHome(),
  homeData: state.homeData,
  loading: state.loading,
});

const stores = [{store: useUserStore, selector: userSelector}];

export default connect(stores)(HomeScreen);
