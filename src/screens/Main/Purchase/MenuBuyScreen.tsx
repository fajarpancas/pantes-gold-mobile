import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
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
import Spacer from '../../../components/Spacer';
import Images from '../../../themes/Images';
import PesanCuciCard from '../../../components/PesanCuciCard';
import FloatingAdd from './FloatingAdd';

class MenuBuyScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topMenuSelected: 0,
      modalVisible: false,
      cabangSelected: undefined,
    };
  }

  componentDidMount(): void {
    this.onRefresh(1);
  }

  onRefresh = (page: number) => {
    const {getPesanCuci} = this.props;
    const params = {
      page,
    };
    getPesanCuci(params);
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  onLoadMore = () => {
    const {loading, pesanCuci} = this.props;

    if (!loading && pesanCuci?.current_page < pesanCuci?.last_page) {
      this.onRefresh(pesanCuci?.current_page + 1);
    }
  };

  renderLoading = () => {
    const {loading, pesanCuci} = this.props;
    if (loading && pesanCuci?.current_page) {
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
    const {pesanCuci, loading} = this.props;
    const pesanCuciList = pesanCuci?.data || [];

    return (
      <View style={styles.flexCenter}>
        <FlatList
          data={pesanCuciList}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.padding,
                index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
              ]}>
              <PesanCuciCard
                item={item}
                onPress={() =>
                  NavigationServices.navigate('PesanCuciDetailScreen', item)
                }
              />
            </View>
          )}
          contentContainerStyle={
            pesanCuciList?.length
              ? styles.paddingHorizontal
              : styles.emptyContainer
          }
          refreshing={loading}
          onRefresh={() => this.onRefresh(1)}
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
                    Belum ada penawaran{'\n'}yang dibuat
                  </Text>
                </View>
              );
            }
            return null;
          }}
          ListFooterComponent={this.renderLoading}
        />

        <FloatingAdd
          onPress={() => NavigationServices.navigate('AddPesanCuci', {})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    paddingTop: scale(15),
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
  getPesanCuci: (params: any) => state.getPesanCuci(params),
  pesanCuci: state.pesanCuci,
  loading: state.loading,
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(MenuBuyScreen);
