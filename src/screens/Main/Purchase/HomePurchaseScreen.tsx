import React from 'react';
import {
  ActivityIndicator,
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

const TOP_MENU = ['Pesanan\n/Req', 'Pesan\nBeli', 'Beli'];

class HomePurchaseScreen extends React.PureComponent {
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
    const {topMenuSelected, cabangSelected} = this.state;
    if (topMenuSelected === 0) {
      if (cabangSelected) {
        getPurchaseOrder({kd_toko: cabangSelected?.kd_toko});
      } else {
        getPurchaseOrder();
      }
    }
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <HeaderCabang />
        <View style={styles.flexCenter}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
          <Text color={Colors.primary}>Loading data</Text>
        </View>
      </View>
    );
  };

  render(): React.ReactNode {
    const {loading, purchaseOrder, cabang} = this.props;
    const {topMenuSelected, modalVisible, cabangSelected} = this.state;
    const purchaseOrderLists = purchaseOrder?.data || [];

    if (purchaseOrderLists?.length === 0) {
      return (
        <View style={styles.flexCenter}>
          <Text color={Colors.primary}>Belum ada data</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

        {/* <View style={styles.menuWrapper}>
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
                      ? Colors.primary
                      : Colors.greenlight,
                  },
                ]}>
                <Text
                  textAlign="center"
                  color={isSelected ? Colors.white : Colors.fontBlack}
                  family={isSelected ? 'bold' : 'regular'}>
                  {menu}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View> */}

        {topMenuSelected === 0 ? (
          <>
            <View style={styles.searchWrapper}>
              <Text>
                {cabangSelected ? cabangSelected?.nama_toko : 'Cari Cabang'}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    this.setState({modalVisible: true}, () =>
                      this.props.getCabang(),
                    )
                  }>
                  <Image source={Images.iconFilter} style={styles.dropdown} />
                </TouchableOpacity>
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
            </View>
            {loading ? (
              this.renderLoading()
            ) : (
              <PurchaseOrder loading={loading} data={purchaseOrderLists} />
            )}
          </>
        ) : null}
        <ModalSelectCabang
          cabang={cabang}
          modalVisible={modalVisible}
          onHide={() => this.setState({modalVisible: false})}
          onSelected={c =>
            this.setState({cabangSelected: c}, () => {
              setTimeout(() => {
                this.onRefresh();
              }, 500);
            })
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
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: scale(10),
    marginHorizontal: scale(20),
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
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
});

const stores = [
  {store: usePurchaseStore, selector: purchaseSelector},
  {store: useUserStore, selector: userSelector},
];

export default connect(stores)(HomePurchaseScreen);
