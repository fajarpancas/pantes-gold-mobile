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
import {connect} from '../../../services/ZustandHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Images from '../../../themes/Images';
import Spacer from '../../../components/Spacer';
import OrderBuyCard from '../../../components/OrderBuyCard';
import ModalSelectPabrik from './ModalSelectPabrik';
import ModalSelectJenisBarang from './ModalSelectJenisBarang';
import useUserStore from '../../../stores/user/UserStore';
import UserModel from '../../../models/UserModel';
import ModalSelectCabang from './ModalSelectCabang';
import ModalSelectKadar from './ModalSelectKadar';
import ModalSelectWarna from './ModalSelectWarna';

const KADAR = ['muda', 'tua'];

class MenuOrderBuyScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      topMenuSelected: 0,
      modalVisible: false,
      modalVisibleJenis: false,
      modalCabangVisible: false,
      modalKadarVisible: false,
      pabrikSelected: undefined,
      jenisSelected: undefined,
      cabangSelected: undefined,
      kadarSelected: undefined,
      warnaSelected: undefined,
      modalVisibleWarna: false,
    };
  }

  componentDidMount(): void {
    const {getPabrik, getJenisBarang} = this.props;
    getPabrik();
    getJenisBarang();

    this.onRefresh();
  }

  onRefresh = () => {
    const {getPesanBeli} = this.props;
    const {
      pabrikSelected,
      warnaSelected,
      kadarSelected,
      jenisSelected,
      cabangSelected,
    } = this.state;

    let params = {};

    if (pabrikSelected?.nama_pabrik) {
      params = {
        ...params,
        id_pabrik: pabrikSelected?.id_pabrik,
      };
    }

    if (jenisSelected?.kd_barang) {
      params = {
        ...params,
        jenis_barang: jenisSelected?.kd_barang,
      };
    }

    if (cabangSelected) {
      params = {
        ...params,
        kd_toko: cabangSelected?.kd_toko,
      };
    }

    if (warnaSelected) {
      params = {
        ...params,
        warna: warnaSelected,
      };
    }

    if (kadarSelected) {
      params = {
        ...params,
        kadar: kadarSelected,
      };
    }

    getPesanBeli(params);
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
    const {loading, pesanBeli, pabrikList, jenisBarang, cabang} = this.props;
    const pesanBeliLists = pesanBeli || [];
    const {
      pabrikSelected,
      jenisSelected,
      kadarSelected,
      warnaSelected,
      cabangSelected,
      modalCabangVisible,
    } = this.state;
    const pabrikLists = pabrikList?.length ? pabrikList : [];

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
              this.setState({modalCabangVisible: true}, () =>
                this.props.getCabang(),
              )
            }
            style={styles.searchWrapper}>
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
                        this.onRefresh();
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
            style={styles.searchWrapper}>
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
                        this.onRefresh();
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
            onPress={() => this.setState({modalVisible: true})}
            style={styles.searchWrapper}>
            <View
              style={{
                width: pabrikSelected?.nama_pabrik ? scale(50) : scale(75),
              }}>
              <Text numberOfLines={1}>
                {pabrikSelected ? pabrikSelected?.nama_pabrik : 'Cari Pabrik'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.iconDropdown} style={styles.dropdown} />
              {pabrikSelected?.id_pabrik ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.setState({pabrikSelected: undefined}, () => {
                      setTimeout(() => {
                        this.onRefresh();
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
            style={styles.searchWrapper}>
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
                        this.onRefresh();
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
          style={{...styles.searchWrapper, marginLeft: scale(20)}}>
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

        <ModalSelectPabrik
          pabrik={pabrikLists}
          modalVisible={this.state.modalVisible}
          onHide={() => this.setState({modalVisible: false})}
          onSelected={p =>
            this.setState({pabrikSelected: p}, () => {
              this.onRefresh();
            })
          }
        />
        <ModalSelectJenisBarang
          jenisBarang={jenisBarang || []}
          modalVisible={this.state.modalVisibleJenis}
          onHide={() => this.setState({modalVisibleJenis: false})}
          onSelected={c =>
            this.setState({jenisSelected: c}, () => this.onRefresh())
          }
        />

        <ModalSelectCabang
          cabang={cabang}
          modalVisible={modalCabangVisible}
          onHide={() => this.setState({modalCabangVisible: false})}
          onSelected={c =>
            this.setState({cabangSelected: c}, () => {
              setTimeout(() => {
                this.onRefresh();
              }, 500);
            })
          }
        />

        <ModalSelectWarna
          modalVisible={this.state.modalVisibleWarna}
          onHide={() => this.setState({modalVisibleWarna: false})}
          onSelected={c =>
            this.setState({warnaSelected: c?.color}, () => this.onRefresh(1))
          }
        />

        <ModalSelectKadar
          kadar={KADAR}
          modalVisible={this.state.modalKadarVisible}
          onHide={() => this.setState({modalKadarVisible: false})}
          onSelected={c => this.setState({kadarSelected: c}, this.onRefresh)}
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
  searchWrapper: {
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
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPesanBeli: (params: any) => state.getPesanBeli(params),
  pesanBeli: state.pesanBeli,
  loading: state.loading,
  getPabrik: () => state.getPabrik(),
  pabrikList: state.pabrikList,
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

export default connect(stores)(MenuOrderBuyScreen);
