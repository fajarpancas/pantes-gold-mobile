import React from 'react';
import Text from './Text';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Spacer from './Spacer';
import dayjs from 'dayjs';
import {STATUS} from '../const/Data';

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
    if (item?.status > 0) {
      return {backgroundColor: STATUS[item?.status - 1]?.color};
    }
    return {backgroundColor: 'yellow'};
  };

  const getItemStatus = (status: number) => {
    if (status > 0) {
      return STATUS[status - 1]?.name;
    }
    return 'Kirim Sebagian';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      <Image source={{uri: item?.url_foto}} style={styles.image} />
      <Spacer height={8} />
      <Text family="bold" numberOfLines={1}>
        {item?.nama_barang}
      </Text>
      <Spacer height={8} />
      <Text>{dayjs(item?.created_at).format('DD/MM/YYYY')}</Text>
      <Text numberOfLines={1}>
        Qantity<Text family="bold"> {item?.qty}</Text>
      </Text>
      <Text numberOfLines={1}>
        Kadar<Text family="bold"> {item?.kadar}</Text>
      </Text>
      <Text numberOfLines={1}>
        Berat<Text family="bold"> {item?.berat}gr</Text>
      </Text>

      <Spacer height={6} />

      <View
        style={[
          getStyles(),
          styles.statusWrapper,
          item?.status < 0
            ? {
                paddingHorizontal: scale(4),
              }
            : {
                alignItems: 'center',
              },
        ]}>
        <Text
          family="bold"
          numberOfLines={1}
          color={
            item?.status > 0
              ? STATUS[item?.status - 1]?.textColor || Colors.fontBlack
              : Colors.fontSemiBlack
          }>
          {getItemStatus(item?.status)}
        </Text>
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
    backgroundColor: '#f2f2f2',
  },
  statusWrapper: {
    borderRadius: scale(8),
    paddingVertical: scale(4),
  },
});

export default OrderCard;
