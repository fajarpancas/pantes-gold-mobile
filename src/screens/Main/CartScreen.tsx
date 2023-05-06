import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {sessionStore} from '../../stores/session/SessionStore';
import Spacer from '../../components/Spacer';
import Colors from '../../themes/Colors';
import Text from '../../components/Text';
import Images from '../../themes/Images';
import {scale} from '../../services/Scale';
import NavigationServices from '../../services/NavigationServices';
import dayjs from 'dayjs';

class CartScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onPressLogout = this.onPressLogout.bind(this);
  }

  onPressLogout() {
    sessionStore.getState().setLogin(false);
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => NavigationServices.navigate('OfferDetailScreen', item)}
        activeOpacity={0.8}
        style={styles.cartItem}>
        <Image source={{uri: item?.image}} style={styles.image} />
        <Spacer width={12} />
        <View>
          <Text family="bold">{item.name}</Text>
          <Text>Quantity {item.qty}</Text>
          <Text>Dipesan pada {dayjs(item.date).format('DD/MM/YYYY')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render(): React.ReactNode {
    const dummy = [];
    return (
      <View style={styles.container}>
        <Spacer height={10} />

        <FlatList
          data={dummy}
          renderItem={this.renderItem}
          contentContainerStyle={
            dummy?.length ? styles.paddingHorizontal : styles.emptyContainer
          }
          ListEmptyComponent={
            <View>
              <Image source={Images.iconEmpty} style={styles.emptyIcon} />
              <Text size={16} textAlign="center" lineHeight={21.86}>
                Keranjangmu masih kosong
              </Text>
            </View>
          }
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
    width: scale(85),
    height: scale(60),
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
});

export default CartScreen;
