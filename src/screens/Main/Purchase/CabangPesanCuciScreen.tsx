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
import {connect} from '../../../services/ZustandHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Images from '../../../themes/Images';
import OrderCard from '../../../components/OrderCard';
import Spacer from '../../../components/Spacer';
import ModalSelectCabang from './ModalSelectCabang';
import UserModel from '../../../models/UserModel';
import useUserStore from '../../../stores/user/UserStore';

class CabangPesanCuciScreen extends React.PureComponent {
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

  onRefresh = () => {
    const {getCabangPesanCuci} = this.props;
    const {cabangSelected} = this.state;
    if (cabangSelected) {
      getCabangPesanCuci({kd_toko: cabangSelected?.kd_toko});
    } else {
      getCabangPesanCuci();
    }
  };

  render(): React.ReactNode {
    const {loading, cabang, cabangPesanCuci, loadingCabang} = this.props;
    const {modalVisible, cabangSelected} = this.state;
    const cabangPesanCuciLists = cabangPesanCuci?.data || [];

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

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
        <FlatList
          data={cabangPesanCuciLists}
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
                      'CabangPesanCuciDetailScreen',
                      item,
                    );
                  }}
                />
              </View>
            );
          }}
          onRefresh={this.onRefresh}
          refreshing={loading}
          contentContainerStyle={
            cabangPesanCuciLists?.length
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
          loading={loadingCabang}
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
});

const purchaseSelector = (state: PurchaseModel) => ({
  getCabangPesanCuci: (params: string) => state.getCabangPesanCuci(params),
  cabangPesanCuci: state.cabangPesanCuci,
  loading: state.loading,
});

const userSelector = (state: UserModel) => ({
  getCabang: params => state.getCabang(params),
  cabang: state.cabang,
  loadingCabang: state.loading,
});

const stores = [
  {store: usePurchaseStore, selector: purchaseSelector},
  {store: useUserStore, selector: userSelector},
];

export default connect(stores)(CabangPesanCuciScreen);
