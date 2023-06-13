import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import HeaderCabang from '../../components/HeaderCabang';
import dayjs from 'dayjs';
import {STATUS} from '../../const/Data';

class OrderDetailScreen extends React.PureComponent {
  getStyles = (status: number) => {
    return {backgroundColor: STATUS[status - 1]?.color || Colors.outlineBase};
  };

  getItemStatus = (status: number) => {
    return STATUS[status - 1]?.name;
  };

  render(): React.ReactNode {
    const {params} = this.props.route;
    return (
      <View style={styles.bgContainer}>
        <View style={{flex: 1}}>
          <HeaderCabang />
          <View style={styles.container}>
            <Spacer height={30} />
            <Image source={{uri: params?.url_foto}} style={styles.image} />
            <Spacer height={20} />

            <Text family="bold" size={18} lineHeight={20}>
              {params?.nama_barang}
            </Text>

            <Spacer height={15} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Tanggal Pemesanan</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dayjs(params?.created_at).format('DD/MM/YYYY')}
              </Text>
            </View>

            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Quantity Pesanan</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {params?.qty}
              </Text>
            </View>

            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Kadar Emas</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {params?.kadar}
              </Text>
            </View>

            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Berat Emas</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {params?.berat}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={[this.getStyles(params?.status), styles.statusWrapper]}>
            <Text
              family="bold"
              color={
                STATUS[params?.status - 1]?.textColor ?? Colors.fontSemiBlack
              }
              size={16}>
              {this.getItemStatus(params?.status)}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    paddingHorizontal: scale(20),
  },
  image: {
    width: scale(320),
    height: scale(200),
    resizeMode: 'contain',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: 0.6,
  },
  statusWrapper: {
    paddingVertical: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderDetailScreen;
