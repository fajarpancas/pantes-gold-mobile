import React from 'react';
import Text from './Text';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Spacer from './Spacer';

type Penawaran = {
  id_penawaran: number;
  url_foto: string;
  keterangan_produk: string;
};

type Props = {
  item: Penawaran;
  onPress?: () => void;
};

const OfferCard: React.FC<Props> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}>
      <Image source={{uri: item?.url_foto}} style={styles.image} />
      <Spacer height={8} />

      <View style={styles.nameHeight}>
        <Text numberOfLines={2} textAlign="center">
          {item?.keterangan_produk}
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
  nameHeight: {
    height: scale(40),
    justifyContent: 'center',
  },
});

export default OfferCard;
