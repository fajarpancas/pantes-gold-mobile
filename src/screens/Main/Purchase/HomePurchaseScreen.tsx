import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import NavigationServices from '../../../services/NavigationServices';
import UserModel from '../../../models/UserModel';
import useUserStore from '../../../stores/user/UserStore';
import {connect} from '../../../services/ZustandHelper';
import {sessionStore} from '../../../stores/session/SessionStore';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Images from '../../../themes/Images';
import ModalSelectCabang from './ModalSelectCabang';
import OrderCard from '../../../components/OrderCard';
import Spacer from '../../../components/Spacer';
import {STATUS} from '../../../const/Data';
import ModalSelectJenisBarang from './ModalSelectJenisBarang';
import ModalSelectKadar from './ModalSelectKadar';
import ModalSelectWarna from './ModalSelectWarna';

const KADAR = ['muda', 'tua'];

class HomePurchaseScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topMenuSelected: 0,
      modalVisible: false,
      modalStatusVisible: false,
      modalVisibleJenis: false,
      modalKadarVisible: false,
      cabangSelected: undefined,
      statusSelected: undefined,
      jenisSelected: undefined,
      kadarSelected: undefined,
      warnaSelected: undefined,
      modalVisibleWarna: false,
    };
  }

  componentDidMount(): void {
    const {getJenisBarang} = this.props;
    setTimeout(() => {
      const role = sessionStore.getState().user?.id_role;
      if (role === 2) {
        this.onRefresh(1);
        getJenisBarang();
      }
    }, 300);
  }

  onRefresh = (page: number) => {
    const {getPurchaseOrder} = this.props;
    const {
      cabangSelected,
      warnaSelected,
      statusSelected,
      jenisSelected,
      kadarSelected,
    } = this.state;
    let params = {
      page,
    };

    if (cabangSelected) {
      params = {
        ...params,
        kd_toko: cabangSelected?.kd_toko,
      };
    }

    if (typeof statusSelected === 'number') {
      params = {
        ...params,
        status: Number(statusSelected) + 1,
      };
    }

    if (jenisSelected?.kd_barang) {
      params = {
        ...params,
        kd_barang: jenisSelected?.kd_barang,
      };
    }

    if (kadarSelected) {
      params = {
        ...params,
        kadar: kadarSelected,
      };
    }

    if (warnaSelected) {
      params = {
        ...params,
        warna: warnaSelected,
      };
    }

    getPurchaseOrder(params);
  };

  onLoadMore = () => {
    const {loading, purchaseOrder} = this.props;

    if (!loading && purchaseOrder?.current_page < purchaseOrder?.last_page) {
      this.onRefresh(purchaseOrder?.current_page + 1);
    }
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  renderLoading = () => {
    const {loading, purchaseOrder} = this.props;
    if (loading && purchaseOrder?.current_page) {
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
    const {loading, purchaseOrder, cabang, jenisBarang} = this.props;
    const {
      modalVisible,
      cabangSelected,
      kadarSelected,
      statusSelected,
      jenisSelected,
      warnaSelected,
    } = this.state;
    const purchaseOrderLists = purchaseOrder?.data || [];

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

        <Spacer height={20} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: scale(20),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              this.setState({modalVisible: true}, () => this.props.getCabang())
            }
            style={styles.searchWrapper2}>
            <View
              style={{
                width: cabangSelected?.nama_toko ? scale(50) : scale(75),
              }}>
              <Text numberOfLines={1}>
                {cabangSelected ? cabangSelected?.nama_toko : 'Cari Cabang'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.iconDropdown} style={styles.dropdown} />
              {cabangSelected?.kd_toko ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.setState({cabangSelected: undefined}, () => {
                      setTimeout(() => {
                        this.onRefresh(1);
                      }, 500);
                    })
                  }>
                  <Image source={Images.iconClose} style={styles.close} />
                </TouchableOpacity>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({modalVisibleJenis: true})}
            style={styles.searchWrapper2}>
            <View
              style={{
                width: jenisSelected?.nama_jenis_barang ? scale(50) : scale(75),
              }}>
              <Text numberOfLines={1}>
                {jenisSelected
                  ? jenisSelected?.nama_jenis_barang
                  : 'Jenis Barang'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.iconDropdown} style={styles.dropdown} />
              {jenisSelected?.nama_jenis_barang ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.setState({jenisSelected: undefined}, () => {
                      setTimeout(() => {
                        this.onRefresh(1);
                      }, 500);
                    })
                  }>
                  <Image source={Images.iconClose} style={styles.close} />
                </TouchableOpacity>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: scale(20),
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({modalStatusVisible: true})}
            style={styles.searchWrapper2}>
            <View
              style={{
                width:
                  typeof statusSelected === 'number' ? scale(50) : scale(75),
              }}>
              <Text numberOfLines={1}>
                {typeof statusSelected === 'number'
                  ? STATUS[statusSelected]?.name
                  : 'Status'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.iconDropdown} style={styles.dropdown} />
              {typeof statusSelected === 'number' ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.setState({statusSelected: undefined}, () => {
                      setTimeout(() => {
                        this.onRefresh(1);
                      }, 500);
                    })
                  }>
                  <Image source={Images.iconClose} style={styles.close} />
                </TouchableOpacity>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({modalKadarVisible: true})}
            style={styles.searchWrapper2}>
            <View
              style={{
                width: kadarSelected ? scale(50) : scale(75),
              }}>
              <Text numberOfLines={1} textTransform="capitalize">
                {kadarSelected ? kadarSelected : 'Kadar'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.iconDropdown} style={styles.dropdown} />
              {kadarSelected ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.setState({kadarSelected: undefined}, () => {
                      setTimeout(() => {
                        this.onRefresh(1);
                      }, 500);
                    })
                  }>
                  <Image source={Images.iconClose} style={styles.close} />
                </TouchableOpacity>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.setState({modalVisibleWarna: true})}
          style={{...styles.searchWrapper2, marginLeft: scale(20)}}>
          <View
            style={{
              width: warnaSelected ? scale(50) : scale(75),
            }}>
            <Text numberOfLines={1} textTransform="capitalize">
              {warnaSelected ?? 'Warna'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.iconDropdown} style={styles.dropdown} />
            {warnaSelected ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  this.setState({warnaSelected: undefined}, () => {
                    setTimeout(() => {
                      this.onRefresh(1);
                    }, 500);
                  })
                }>
                <Image source={Images.iconClose} style={styles.close} />
              </TouchableOpacity>
            ) : null}
          </View>
        </TouchableOpacity>

        <FlatList
          data={purchaseOrderLists}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.padding,
                  index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
                ]}>
                <OrderCard
                  item={item}
                  onPress={() => {
                    NavigationServices.navigate('PurchaseOrderDetailScreen', {
                      ...item,
                      filter: {cabangSelected, statusSelected},
                    });
                  }}
                />
              </View>
            );
          }}
          onRefresh={() => this.onRefresh(1)}
          refreshing={loading}
          contentContainerStyle={
            purchaseOrderLists?.length
              ? styles.paddingHorizontal
              : styles.emptyContainer
          }
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
                    Data yang anda cari{'\n'}tidak ditemukan
                  </Text>
                </View>
              );
            }
            return null;
          }}
          ListFooterComponent={this.renderLoading}
        />
        <ModalSelectCabang
          cabang={cabang}
          modalVisible={modalVisible}
          onHide={() => this.setState({modalVisible: false})}
          onSelected={c =>
            this.setState({cabangSelected: c}, () => {
              setTimeout(() => {
                this.onRefresh(1);
              }, 500);
            })
          }
        />
        <ModalSelectJenisBarang
          jenisBarang={jenisBarang || []}
          modalVisible={this.state.modalVisibleJenis}
          onHide={() => this.setState({modalVisibleJenis: false})}
          onSelected={c =>
            this.setState({jenisSelected: c}, () => this.onRefresh(1))
          }
        />
        <Modal transparent visible={this.state.modalStatusVisible}>
          <View style={styles.modalBackground} />
          <View style={styles.modalContainer}>
            <View style={styles.modalWrapper}>
              <Text size={16} family="bold">
                Pilih Status
              </Text>
              <Spacer height={10} />
              <View style={{alignItems: 'center'}}>
                {STATUS.map((s, index) => {
                  const isSelected = index === statusSelected;
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState(
                          {
                            modalStatusVisible: false,
                            statusSelected: index,
                          },
                          () => {
                            this.onRefresh(1);
                          },
                        )
                      }
                      style={{
                        backgroundColor: isSelected
                          ? Colors.primary
                          : Colors.white,
                        borderColor: Colors.outlineBase,
                        borderWidth: 1,
                        width: scale(320),
                        borderRadius: scale(8),
                        marginVertical: scale(2),
                        alignItems: 'center',
                        paddingVertical: scale(10),
                      }}>
                      <Text color={isSelected ? Colors.white : Colors.black}>
                        {s.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>

        <ModalSelectKadar
          kadar={KADAR}
          modalVisible={this.state.modalKadarVisible}
          onHide={() => this.setState({modalKadarVisible: false})}
          onSelected={c => this.setState({kadarSelected: c}, this.onRefresh)}
        />

        <ModalSelectWarna
          modalVisible={this.state.modalVisibleWarna}
          onHide={() => this.setState({modalVisibleWarna: false})}
          onSelected={c =>
            this.setState({warnaSelected: c?.color}, () => this.onRefresh(1))
          }
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
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(30),
    marginHorizontal: scale(20),
  },
  modalBackground: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: scale(360),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    paddingBottom: scale(40),
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  menuBox: {
    width: scale(100),
    height: scale(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: scale(20),
    height: scale(20),
  },
  close: {
    tintColor: 'red',
    width: scale(17),
    height: scale(17),
    marginLeft: scale(20),
  },
  searchWrapper2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
    width: scale(155),
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: scale(10),
    marginHorizontal: scale(20),
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
  },
  emptyIcon: {
    height: scale(88),
    width: scale(88),
    alignSelf: 'center',
  },
  padding: {
    paddingVertical: scale(5),
  },
  paddingLeft10: {
    paddingLeft: scale(10),
  },
  paddingHorizontal: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPurchaseOrder: (params: string) => state.getPurchaseOrder(params),
  purchaseOrder: state.purchaseOrder,
  loading: state.loading,
});

const userSelector = (state: UserModel) => ({
  getCabang: () => state.getCabang(),
  cabang: state.cabang,
  getJenisBarang: () => state.getJenisBarang(),
  jenisBarang: state.jenisBarang,
});

const stores = [
  {store: usePurchaseStore, selector: purchaseSelector},
  {store: useUserStore, selector: userSelector},
];

export default connect(stores)(HomePurchaseScreen);
