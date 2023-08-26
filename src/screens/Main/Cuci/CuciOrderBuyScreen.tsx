import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import NavigationServices from '../../../services/NavigationServices';
import {connect} from '../../../services/ZustandHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Images from '../../../themes/Images';
import Spacer from '../../../components/Spacer';
import OrderBuyCard from '../../../components/OrderBuyCard';
import FloatingAdd from '../Purchase/FloatingAdd';
import OrderCard from '../../../components/OrderCard';

class CuciOrderBuyScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      cabangSelected: undefined,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = (page: number) => {
    const {getOrderCuciList} = this.props;
    getOrderCuciList({per_page: 15, page});
  };

  onLoadMore = () => {
    const {loading, orderCuciList} = this.props;

    if (!loading && orderCuciList?.current_page < orderCuciList?.last_page) {
      this.onRefresh(orderCuciList?.current_page + 1);
    }
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  renderLoading = () => {
    const {loading, orderCuciList} = this.props;
    if (loading && orderCuciList?.current_page) {
      return (
        <View style={styles.flexCenter}>
          <Spacer height={10} />
          <ActivityIndicator size={'small'} color={Colors.primary} />
          <Spacer height={10} />
        </View>
      );
    }
    return null;
  };

  render(): React.ReactNode {
    try {
      const {loading, orderCuciList} = this.props;
      const orderCuciLists = orderCuciList?.data || [];
      if (orderCuciList?.length === 0 && loading) {
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
              Pesan Beli
            </Text>
          </View>
          <Spacer height={20} />
          <FlatList
            data={orderCuciLists}
            refreshing={loading}
            onRefresh={() => this.onRefresh(1)}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    styles.padding,
                    index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
                  ]}>
                  <OrderCard
                    item={item}
                    onPress={() =>
                      NavigationServices.navigate('OrderDetailCuciScreen', item)
                    }
                  />
                </View>
              );
            }}
            contentContainerStyle={
              orderCuciLists?.length
                ? styles.paddingHorizontal
                : styles.emptyContainer
            }
            numColumns={3}
            onEndReachedThreshold={1}
            onEndReached={(distance: any) => {
              console.tron.log('onEndReached ', distance);
              if (distance.distanceFromEnd > 110) {
                this.onLoadMore();
              }
            }}
            ListEmptyComponent={() => {
              if (!loading) {
                return (
                  <View>
                    <Spacer height={60} />
                    <Image source={Images.iconEmpty} style={styles.emptyIcon} />
                    <Text size={16} textAlign="center" lineHeight={21.86}>
                      Belum ada pesanan yang anda buat
                    </Text>
                  </View>
                );
              }
              return null;
            }}
            ListFooterComponent={this.renderLoading}
          />
          <FloatingAdd
            onPress={() => {
              NavigationServices.navigate('AddOrderCuciScreen', {});
            }}
          />
        </View>
      );
    } catch {
      <View />;
    }
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
  getOrderCuciList: (params: any) => state.getOrderCuciList(params),
  orderCuciList: state.orderCuciList,
  loading: state.loading,
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(CuciOrderBuyScreen);
