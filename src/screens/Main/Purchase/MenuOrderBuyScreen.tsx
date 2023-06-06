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

class MenuOrderBuyScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topMenuSelected: 0,
      modalVisible: false,
      cabangSelected: undefined,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    const {getPesanBeli} = this.props;
    getPesanBeli();
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
    const {loading, pesanBeli} = this.props;
    const pesanBeliLists = pesanBeli || [];

    if (pesanBeli?.length === 0 && loading) {
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
          data={pesanBeliLists}
          renderItem={({item, index}) => (
            <View
              style={[
                styles.padding,
                index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
              ]}>
              <OrderBuyCard
                item={item}
                onPress={() =>
                  NavigationServices.navigate('OrderBuyDetailScreen', item)
                }
              />
            </View>
          )}
          contentContainerStyle={
            pesanBeliLists?.length
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
  getPesanBeli: () => state.getPesanBeli(),
  pesanBeli: state.pesanBeli,
  loading: state.loading,
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(MenuOrderBuyScreen);
