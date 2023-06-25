import React from 'react';
import {
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
import OrderCard from '../../../components/OrderCard';
import Spacer from '../../../components/Spacer';
import {STATUS} from '../../../const/Data';

class PesanBeliCuciListScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      modalStatusVisible: false,
      statusSelected: undefined,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      const role = sessionStore.getState().user?.id_role;
      if (role === 2) {
        this.onRefresh();
      }
    }, 300);
  }

  onRefresh = () => {
    const {getPurchaseOrder} = this.props;
    const {statusSelected} = this.state;
    let params = {};

    if (typeof statusSelected === 'number') {
      params = {
        ...params,
        status: Number(statusSelected) + 1,
      };
    }

    getPurchaseOrder({...params, kd_toko: 0});
  };

  navigate = () => {
    NavigationServices.navigate('OrderScreen', {});
  };

  render(): React.ReactNode {
    const {loading, purchaseOrderCuci} = this.props;
    const {cabangSelected, statusSelected} = this.state;
    const purchaseOrderLists = purchaseOrderCuci?.data || [];

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

        <Spacer height={20} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.setState({modalStatusVisible: true})}
          style={styles.searchWrapper}>
          <Text>
            {typeof statusSelected === 'number'
              ? STATUS[statusSelected]?.name
              : 'Filter status'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={Images.iconDropdown} style={styles.dropdown} />
            {typeof statusSelected === 'number' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  this.setState({statusSelected: undefined}, () => {
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
                    NavigationServices.navigate(
                      'PurchaseOrderDetailCuciScreen',
                      {
                        ...item,
                        filter: {statusSelected},
                      },
                    );
                  }}
                />
              </View>
            );
          }}
          onRefresh={this.onRefresh}
          refreshing={loading}
          contentContainerStyle={
            purchaseOrderLists?.length
              ? styles.paddingHorizontal
              : styles.emptyContainer
          }
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
                            this.onRefresh();
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
  purchaseOrderCuci: state.purchaseOrderCuci,
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

export default connect(stores)(PesanBeliCuciListScreen);
