import React from 'react';
import Text from './Text';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Spacer from './Spacer';
import dayjs from 'dayjs';

type Order = {
  id_order: number;
  url_foto: string;
  nama_barang: string;
  qty: number;
  kadar: string;
  berat: string;
  created_at: string;
  status: number;
};

type Props = {
  item: Order;
  onPress?: () => void;
};

const OrderCard: React.FC<Props> = ({item, onPress}) => {
  const getStyles = () => {
    let backgroundColor = {backgroundColor: '#f2f2f2'};
    switch (item?.status) {
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

  const getItemStatus = (status: number) => {
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

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      <Image source={{uri: item?.url_foto}} style={styles.image} />
      <Spacer height={8} />
      <Text>{dayjs(item?.created_at).format('DD/MM/YYYY')}</Text>
      <Text>
        Qantity<Text family="bold"> {item?.qty}</Text>
      </Text>
      <Text>
        Kadar<Text family="bold"> {item?.kadar}k</Text>
      </Text>
      <Text>
        Berat<Text family="bold"> {item?.berat}gr</Text>
      </Text>

      <Spacer height={6} />

      <View style={[getStyles(), styles.statusWrapper]}>
        <Text family="bold">{getItemStatus(item?.status)}</Text>
      </View>
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
  },
  statusWrapper: {
    borderRadius: scale(8),
    paddingVertical: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderCard;
