import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import OrderCard from '../../components/OrderCard';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import Images from '../../themes/Images';

const img =
  'data:image/jpeg;base64,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';

const dummy = [
  {
    image: img,
    date: '10 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 5,
    status: 'Selesai',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '10 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 5,
    status: 'Selesai',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '10 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 5,
    status: 'Selesai',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '10 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 5,
    status: 'Selesai',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '10 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 5,
    status: 'Selesai',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
  {
    image: img,
    date: '10 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 5,
    status: 'Selesai',
  },
  {
    image: img,
    date: '11 Apr 2023',
    qty: 1,
    kadar: 22,
    berat: 1,
    status: 'Diproses',
  },
  {
    image: img,
    date: '12 Apr 2023',
    qty: 2,
    kadar: 24,
    berat: 2,
    status: 'Ditolak',
  },
];

const STATUS = ['Semua status', 'Diproses', 'Ditolak', 'Selesai'];

class OrderScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filterStatus: 0,
    };
  }

  componentDidMount(): void {}

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <FlatList
          data={dummy}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.padding,
                  index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
                ]}>
                <OrderCard item={item} />
              </View>
            );
          }}
          contentContainerStyle={
            dummy?.length ? styles.paddingHorizontal : styles.emptyContainer
          }
          ListHeaderComponent={
            dummy?.length ? (
              <>
                <Spacer height={5} />

                <View style={styles.rowWrap}>
                  {STATUS.map((s, index) => {
                    const isSelected = index === this.state.filterStatus;
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.setState({filterStatus: index})}
                        style={[
                          styles.statusWrapper,
                          isSelected ? styles.bgGreen : styles.bgWhite,
                          index !== 0 ? styles.marginLeft8 : {},
                        ]}>
                        <Text
                          family={isSelected ? 'semiBold' : 'regular'}
                          color={isSelected ? Colors.white : Colors.fontBlack}>
                          {s}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Spacer height={15} />
                <View style={styles.rowFlex}>
                  <View style={styles.rowBetween}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.rowFlex}>
                      <Image
                        source={Images.iconFilter}
                        style={styles.icFilter}
                      />
                      <Spacer width={10} />
                      <Text size={14}>Filter pesanan</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.resetWrapper}>
                    <TouchableOpacity>
                      <Text color="red" family="bold">
                        Reset filter
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Spacer height={10} />

                <Spacer height={10} />
              </>
            ) : (
              <View />
            )
          }
          numColumns={3}
          ListEmptyComponent={
            <View>
              <Image source={Images.iconEmpty} style={styles.emptyIcon} />
              <Text size={16} textAlign="center" lineHeight={21.86}>
                Pesanan yang anda cari{'\n'}tidak ditemukan
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
  listWrapper: {
    flexDirection: 'row',
    paddingHorizontal: scale(20),
  },
  paddingLeft10: {
    paddingLeft: scale(10),
  },
  paddingHorizontal: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
  },
  padding20: {
    paddingHorizontal: scale(20),
  },
  padding: {
    paddingVertical: scale(5),
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
  icFilter: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
  rowBetween: {
    width: scale(220),
    height: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    paddingLeft: scale(10),
  },
  statusWrapper: {
    borderRadius: scale(12),
    height: scale(30),
    justifyContent: 'center',
    elevation: 5,
    paddingHorizontal: scale(10),
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  bgGreen: {
    backgroundColor: Colors.primary,
  },
  marginLeft8: {
    marginLeft: scale(8),
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowFlex: {
    flexDirection: 'row',
    width: scale(320),
  },
  resetWrapper: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: scale(12),
    height: scale(30),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(90),
    marginLeft: scale(10),
  },
});

export default OrderScreen;
