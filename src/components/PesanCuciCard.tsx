import React from 'react';
import Text from './Text';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Spacer from './Spacer';
import dayjs from 'dayjs';
import {STATUS} from '../const/Data';

type PesanCuci = {
  id_order_cuci: number;
  no_pesan: String;
  kd_produk: String;
  url_foto: String;
  nama_barang: String;
  qty: String;
  kadar: String;
  jenis_barang: String;
  tgl_pesan: String;
  created_at: String;
  status: number;
};

type Props = {
  item: PesanCuci;
  onPress?: () => void;
};

const PesanCuciCard: React.FC<Props> = ({item, onPress}) => {
  const getStyles = () => {
    return {backgroundColor: STATUS[item?.status - 1]?.color};
  };

  const getItemStatus = (status: number) => {
    return STATUS[status - 1]?.name;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      <Image source={{uri: item?.url_foto}} style={styles.image} />
      <Spacer height={8} />

      <Text numberOfLines={1}>
        {dayjs(item?.created_at).format('DD/MM/YYYY')}
      </Text>
      <Text numberOfLines={1}>{item?.nama_barang}</Text>
      <Text numberOfLines={1} family="bold">
        {item?.no_pesan}
      </Text>
      <Text numberOfLines={1}>
        Produk <Text family="bold">{item?.kd_produk}</Text>
      </Text>
      <Text numberOfLines={1}>
        Qty <Text family="bold">{item?.qty}</Text>
      </Text>
      <Text numberOfLines={1}>
        Kadar <Text family="bold">{item?.kadar}</Text>
      </Text>
      <Text numberOfLines={1}>
        Jenis <Text family="bold">{item?.jenis_barang}</Text>
      </Text>

      <Spacer height={6} />

      <View style={[getStyles(), styles.statusWrapper]}>
        <Text
          family="bold"
          color={
            item?.status
              ? STATUS[item?.status - 1].textColor
              : Colors.fontSemiBlack
          }>
          {getItemStatus(item?.status)}
        </Text>
      </View>

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

export default PesanCuciCard;
