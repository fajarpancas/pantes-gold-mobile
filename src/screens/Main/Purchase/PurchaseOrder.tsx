import React from 'react';
import {FlatList, Image, View} from 'react-native';
import Text from '../../../components/Text';
import OrderCard from '../../../components/OrderCard';
import Spacer from '../../../components/Spacer';
import Images from '../../../themes/Images';
import {scale} from '../../../services/Scale';
import NavigationServices from '../../../services/NavigationServices';

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
  data: Order[];
  loading: Boolean;
};
const PurchaseOrder: React.FC<Props> = props => {
  const {data, loading} = props;
  return (
    <FlatList
      data={data}
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
                NavigationServices.navigate('PurchaseOrderDetailScreen', item);
              }}
            />
          </View>
        );
      }}
      contentContainerStyle={
        data?.length ? styles.paddingHorizontal : styles.emptyContainer
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
  );
};

const styles = {
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
};

export default PurchaseOrder;
