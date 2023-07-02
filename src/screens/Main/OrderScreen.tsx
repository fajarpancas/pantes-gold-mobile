import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import OrderCard from '../../components/OrderCard';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import Images from '../../themes/Images';
import ModalFilter from '../../components/ModalFilter';
import useUserStore from '../../stores/user/UserStore';
import UserModel from '../../models/UserModel';
import {connect} from '../../services/ZustandHelper';
import {GetOrderListParams} from '../../models/apimodel/ApiRequest';
import Fonts from '../../themes/Fonts';
import Button from '../../components/Button';
import NavigationServices from '../../services/NavigationServices';

const STATUS = ['Semua status', 'Diproses', 'Ditolak', 'Selesai'];

class OrderScreen extends React.PureComponent {
  page = 1;
  search = '';
  kadar = null;
  berat = null;
  qty = null;

  constructor(props) {
    super(props);

    this.state = {
      filterStatus: 0,
      modalVisible: false,
    };
  }

  componentDidMount(): void {
    this.onRefresh(1);
  }

  onRefresh = (page: number) => {
    let paramData: GetOrderListParams = {
      per_page: 20,
      page,
    };

    if (this.search !== '') {
      paramData = {
        ...paramData,
        search: this.search,
      };
    }

    if (this.kadar) {
      paramData = {
        ...paramData,
        kadar: this.kadar,
      };
    }

    if (this.berat) {
      paramData = {
        ...paramData,
        berat: this.berat,
      };
    }

    if (this.qty) {
      paramData = {
        ...paramData,
        qty: this.qty,
      };
    }

    this.props.getOrderList(paramData);
  };

  onLoadMore = () => {
    const {loading, orderList} = this.props;

    if (!loading && orderList?.current_page < orderList?.last_page) {
      this.onRefresh(orderList?.current_page + 1);
    }
  };

  renderLoading = () => {
    const {loading, orderList} = this.props;
    if (loading && orderList?.current_page) {
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
    const {modalVisible} = this.state;
    const {orderList, loading} = this.props;
    const listData = orderList?.data?.length ? orderList?.data : [];

    return (
      <View style={styles.container}>
        <FlatList
          data={listData}
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
                    NavigationServices.navigate('OrderDetailScreen', item)
                  }
                />
              </View>
            );
          }}
          contentContainerStyle={
            listData?.length ||
            this.search ||
            this.berat ||
            this.kadar ||
            this.qty
              ? styles.paddingHorizontal
              : styles.emptyContainer
          }
          ListHeaderComponent={
            listData?.length ||
            this.search ||
            this.berat ||
            this.kadar ||
            this.qty ? (
              <>
                <Spacer height={5} />

                {/* <View style={styles.rowWrap}>
                  {STATUS.map((s, index) => {
                    const isSelected = index === this.state.filterStatus;
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.setState({filterStatus: index})}
                        style={[
                          styles.statusWrapper,
                          isSelected ? styles.bgGreen : styles.bgWhite,
                          index !== 0 ? styles.marginLeft8 : {},
                        ]}>
                        <Text
                          family={isSelected ? 'semiBold' : 'regular'}
                          color={isSelected ? Colors.white : Colors.fontBlack}>
                          {s}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View> */}
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                      <Image
                        source={Images.iconSearch}
                        style={styles.searchIcon}
                      />
                    </View>
                    <TextInput
                      placeholder="Nama barang..."
                      placeholderTextColor={'grey'}
                      defaultValue={this.search}
                      onChangeText={text => (this.search = text)}
                      style={styles.textInput}
                    />
                  </View>

                  <TextInput
                    placeholder="Quantity"
                    placeholderTextColor={'grey'}
                    keyboardType="number-pad"
                    defaultValue={this.qty}
                    maxLength={3}
                    onChangeText={text => (this.qty = text)}
                    style={styles.textInputQty}
                  />
                </View>
                <Spacer height={10} />
                <View style={{flexDirection: 'row'}}>
                  {/* <View style={styles.wrapperInput}>
                    <TextInput
                      placeholder="Kadar"
                      maxLength={3}
                      onChangeText={text => (this.kadar = text)}
                      placeholderTextColor={'grey'}
                      defaultValue={this.kadar}
                      keyboardType="number-pad"
                      style={styles.textInputKadar}
                    />
                    <View style={styles.labelInput}>
                      <Text family="bold" color={Colors.primary} size={12}>
                        K
                      </Text>
                    </View>
                  </View> */}
                  {/* <Spacer width={10} /> */}
                  <View style={styles.wrapperInput}>
                    <TextInput
                      placeholder="Berat"
                      placeholderTextColor={'grey'}
                      maxLength={3}
                      defaultValue={this.berat}
                      onChangeText={text => (this.berat = text)}
                      keyboardType="number-pad"
                      style={styles.textInputKadar}
                    />
                    <View style={styles.labelInput}>
                      <Text family="bold" color={Colors.primary} size={12}>
                        gr
                      </Text>
                    </View>
                  </View>
                  <Spacer width={15} />
                  <View style={{width: scale(62)}}>
                    <Button
                      title="Reset"
                      onPress={() => {
                        this.search = '';
                        this.berat = null;
                        this.kadar = null;
                        this.qty = null;
                        setTimeout(() => {
                          this.onRefresh();
                        }, 100);
                      }}
                      color="red"
                    />
                  </View>
                  <Spacer width={5} />
                  <View style={{width: scale(62)}}>
                    <Button
                      title="Cari"
                      onPress={this.onRefresh}
                      color={Colors.primary}
                    />
                  </View>
                </View>
                {/* <View style={styles.rowFlex}>
                  <View style={styles.rowBetween}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({modalVisible: true});
                      }}
                      activeOpacity={0.8}
                      style={styles.rowFlex}>
                      <Image
                        source={Images.iconFilter}
                        style={styles.icFilter}
                      />
                      <Spacer width={10} />
                      <Text size={14}>Filter lainnya</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.resetWrapper}>
                    <TouchableOpacity>
                      <Text color="red" family="bold">
                        Reset filter
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View> */}

                <Spacer height={10} />
              </>
            ) : (
              <View />
            )
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
                    Pesanan yang anda cari{'\n'}tidak ditemukan
                  </Text>
                </View>
              );
            }
            return null;
          }}
          ListFooterComponent={this.renderLoading}
        />
        <ModalFilter
          visible={modalVisible}
          onSearch={() => {
            this.setState({modalVisible: false});
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
  listWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  paddingLeft10: {
    paddingLeft: scale(10),
  },
  paddingHorizontal: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  padding20: {
    paddingHorizontal: scale(20),
  },
  padding: {
    paddingVertical: scale(5),
  },
  emptyIcon: {
    height: scale(88),
    width: scale(88),
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icFilter: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rowBetween: {
    width: scale(220),
    height: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    paddingLeft: scale(10),
  },
  statusWrapper: {
    borderRadius: scale(12),
    height: scale(30),
    justifyContent: 'center',
    elevation: 5,
    paddingHorizontal: scale(10),
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  bgGreen: {
    backgroundColor: Colors.primary,
  },
  marginLeft8: {
    marginLeft: scale(8),
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowFlex: {
    flexDirection: 'row',
    width: scale(320),
  },
  resetWrapper: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: scale(12),
    height: scale(30),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(90),
    marginLeft: scale(10),
  },
  searchWrapper: {
    backgroundColor: Colors.white,
    width: scale(35),
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  searchContainer: {
    width: scale(233),
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  textInput: {
    width: scale(198),
    backgroundColor: Colors.white,
    fontFamily: Fonts.type.regular,
    fontSize: scale(14),
    color: Colors.fontBlack,
  },
  textInputQty: {
    width: scale(77),
    backgroundColor: Colors.white,
    fontFamily: Fonts.type.regular,
    fontSize: scale(14),
    borderRadius: scale(12),
    elevation: 5,
    marginLeft: scale(10),
    paddingLeft: scale(10),
    color: Colors.fontBlack,
  },
  textInputKadar: {
    width: scale(58),
    backgroundColor: Colors.white,
    fontFamily: Fonts.type.regular,
    fontSize: scale(14),
    borderTopLeftRadius: scale(12),
    borderBottomLeftRadius: scale(12),
    paddingLeft: scale(10),
    color: Colors.fontBlack,
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  wrapperInput: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    elevation: 5,
    width: scale(83),
    borderRadius: scale(12),
    justifyContent: 'space-between',
  },
  labelInput: {
    justifyContent: 'center',
    marginRight: scale(10),
  },
});

const userSelector = (state: UserModel) => ({
  getOrderList: (params: GetOrderListParams) => state.getOrderList(params),
  orderList: state.orderList,
  loading: state.loading,
});

const stores = [{store: useUserStore, selector: userSelector}];

export default connect(stores)(OrderScreen);
