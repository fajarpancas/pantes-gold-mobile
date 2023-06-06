import React from 'react';
import Text from './Text';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Spacer from './Spacer';

type OrderBuy = {
  kd_produk: Number;
  keterangan_produk: string;
  id_pabrik: Number;
  url_foto: string;
  qty: Number;
};

type Props = {
  item: OrderBuy;
  onPress?: () => void;
};

const OrderBuyCard: React.FC<Props> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      <Image source={{uri: item?.url_foto}} style={styles.image} />
      <Spacer height={8} />

      <Text numberOfLines={1}>Produk {item?.kd_produk}</Text>
      <Text numberOfLines={1}>{item?.keterangan_produk}</Text>
      <Text numberOfLines={1}>Qty {item?.qty}</Text>

      <Spacer height={4} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: scale(100),
    borderRadius: scale(12),
    elevation: 5,
    backgroundColor: Colors.white,
    padding: scale(8),
  },
  image: {
    height: scale(84),
    width: scale(84),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    resizeMode: 'cover',
    backgroundColor: '#f2f2f2',
  },
  statusWrapper: {
    borderRadius: scale(100),
    paddingVertical: scale(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderBuyCard;
