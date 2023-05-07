import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spacer from '../../components/Spacer';
import Colors from '../../themes/Colors';
import Text from '../../components/Text';
import Images from '../../themes/Images';
import {scale} from '../../services/Scale';
import NavigationServices from '../../services/NavigationServices';
import dayjs from 'dayjs';
import {connect} from '../../services/ZustandHelper';
import useUserStore from '../../stores/user/UserStore';
import UserModel from '../../models/UserModel';
import HeaderCabang from '../../components/HeaderCabang';

class CartScreen extends React.PureComponent {
  componentDidMount(): void {
    this.onRefresh();
  }

  getStyles = (status: number) => {
    let backgroundColor = {backgroundColor: '#f2f2f2'};
    switch (status) {
      case 3:
        backgroundColor.backgroundColor = Colors.greenlight;
        break;
      case 2:
        backgroundColor.backgroundColor = 'lightblue';
        break;
      case 1:
        backgroundColor.backgroundColor = Colors.yellow;
        break;
      case -1:
        backgroundColor.backgroundColor = Colors.red;
        break;
    }

    return backgroundColor;
  };

  getItemStatus = (status: number) => {
    if (status < 0) {
      return 'Ditolak';
    }

    if (status === 1) {
      return 'Diproses';
    }

    if (status === 2) {
      return 'Dikirim';
    }

    return 'Selesai';
  };

  onRefresh = () => {
    this.props.getCartList();
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        // onPress={() => NavigationServices.navigate('OfferDetailScreen', item)}
        activeOpacity={0.8}
        style={styles.cartItem}>
        <Image source={{uri: item?.url_foto}} style={styles.image} />
        <Spacer width={12} />
        <View style={{justifyContent: 'space-between'}}>
          <View>
            <Text family="bold">{item.nama_barang}</Text>
            <Text>
              Quantity yang diminta{' '}
              <Text family="bold" color={Colors.primary}>
                {item.qty}
              </Text>
            </Text>
            {item.qty_acc ? (
              <Text>
                Quantity yang dikirim{' '}
                <Text family="bold" color={Colors.primary}>
                  {item.qty_acc}
                </Text>
              </Text>
            ) : null}
            <Text>
              Dipesan pada{' '}
              <Text family="bold" color={Colors.primary}>
                {dayjs(item.created_at).format('DD/MM/YYYY')}
              </Text>
            </Text>
          </View>
          <Spacer height={5} />
          <View style={[this.getStyles(item?.status), styles.statusWrapper]}>
            <Text family="bold">{this.getItemStatus(item?.status)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render(): React.ReactNode {
    const {cartList, loading} = this.props;
    return (
      <View style={styles.container}>
        <HeaderCabang showLogout />

        <Spacer height={30} />
        <FlatList
          data={cartList}
          refreshing={loading}
          onRefresh={this.onRefresh}
          renderItem={this.renderItem}
          contentContainerStyle={
            cartList?.length ? styles.paddingHorizontal : styles.emptyContainer
          }
          ListEmptyComponent={() => {
            if (!loading) {
              return (
                <View>
                  <Spacer height={60} />
                  <Image source={Images.iconEmpty} style={styles.emptyIcon} />
                  <Text size={16} textAlign="center" lineHeight={21.86}>
                    Keranjangmu masih kosong
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  paddingHorizontal: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  image: {
    width: scale(100),
    height: scale(100),
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
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
  cartItem: {
    flexDirection: 'row',
    width: scale(320),
    padding: scale(8),
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    marginVertical: scale(7.5),
  },
  statusWrapper: {
    width: scale(190),
    borderRadius: scale(4),
    paddingVertical: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const userSelector = (state: UserModel) => ({
  getCartList: () => state.getCartList(),
  cartList: state.cartList,
  loading: state.loading,
});

const stores = [{store: useUserStore, selector: userSelector}];

export default connect(stores)(CartScreen);
