import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import HeaderCabang from '../../components/HeaderCabang';
import dayjs from 'dayjs';
import {STATUS} from '../../const/Data';
import {connect} from '../../services/ZustandHelper';
import useUserStore from '../../stores/user/UserStore';
import UserModel from '../../models/UserModel';
import Button from '../../components/Button';
import DropdownAlertHolder from '../../services/DropdownAlertHolder';
import CustomDatePicker from '../../components/DatePicker';

class OrderDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      orderDetail: null,
      tglTerima: null,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    const {params} = this.props.route;

    this.props.getDetailOrder({id_order: params?.id_order}, res => {
      this.setState({orderDetail: res});
    });
  };

  getStyles = (status: number) => {
    return {backgroundColor: STATUS[status - 1]?.color || Colors.outlineBase};
  };

  getItemStatus = (status: number) => {
    return STATUS[status - 1]?.name;
  };

  submit = () => {
    const {orderDetail, tglTerima} = this.state;
    const {submitTerimaCabang, getHome} = this.props;

    let paramData = {
      id_order: orderDetail?.id_order,
    };

    if (orderDetail?.status === 4) {
      if (!tglTerima) {
        DropdownAlertHolder.showError('Gagal', 'Tanggal terima harus diisi');
      } else {
        paramData = {
          ...paramData,
          tgl_terima: `${dayjs(tglTerima).format('YYYY-MM-DD')} 00:00:00`,
        };
        submitTerimaCabang(paramData, () => {
          this.onRefresh();
          getHome();
        });
      }
    }
  };

  render(): React.ReactNode {
    const {orderDetail} = this.state;
    const {loading} = this.props;
    return (
      <View style={styles.bgContainer}>
        <ScrollView>
          <View style={{flex: 1}}>
            <HeaderCabang />
            <View style={styles.container}>
              <Spacer height={30} />
              <Image
                source={{uri: orderDetail?.url_foto}}
                style={styles.image}
              />
              <Spacer height={20} />

              <Text family="bold" size={18} lineHeight={20}>
                {orderDetail?.nama_barang}
              </Text>

              <Spacer height={15} />
              <Spacer height={10} />

              <View style={styles.rowBetween}>
                <Text family="bold">Tanggal Pemesanan</Text>
                <Text color={Colors.fontSemiBlack} lineHeight={20}>
                  {dayjs(orderDetail?.created_at).format('DD/MM/YYYY')}
                </Text>
              </View>

              <Spacer height={5} />
              <View style={styles.border} />
              <Spacer height={10} />

              <View style={styles.rowBetween}>
                <Text family="bold">Quantity Pesanan</Text>
                <Text color={Colors.fontSemiBlack} lineHeight={20}>
                  {orderDetail?.qty}
                </Text>
              </View>

              <Spacer height={5} />
              <View style={styles.border} />
              <Spacer height={10} />

              <View style={styles.rowBetween}>
                <Text family="bold">Kadar Emas</Text>
                <Text color={Colors.fontSemiBlack} lineHeight={20}>
                  {orderDetail?.kadar}
                </Text>
              </View>

              <Spacer height={5} />
              <View style={styles.border} />
              <Spacer height={10} />

              <View style={styles.rowBetween}>
                <Text family="bold">Berat Emas</Text>
                <Text color={Colors.fontSemiBlack} lineHeight={20}>
                  {orderDetail?.berat}
                </Text>
              </View>

              <Spacer height={5} />
              <View style={styles.border} />
              <Spacer height={10} />

              {orderDetail?.status === 4 ? (
                <>
                  <View style={styles.rowBetween}>
                    <Text family="bold">Tanggal Terima</Text>
                    {orderDetail?.status === 4 ? (
                      <CustomDatePicker
                        title="Pilih Tanggal Terima"
                        defaultValue={this.state.tglTerima}
                        onSelectDate={d => this.setState({tglTerima: d})}
                      />
                    ) : (
                      <Text color={Colors.fontSemiBlack} lineHeight={20}>
                        {dayjs(
                          orderDetail?.timestamp_terima,
                          'YYYY-MM-DD',
                        ).format('DD/MM/YYYY')}
                      </Text>
                    )}
                  </View>
                  <Spacer height={5} />
                  <View style={styles.border} />
                  <Spacer height={10} />
                </>
              ) : (
                <View />
              )}
            </View>
          </View>
        </ScrollView>

        <View>
          {orderDetail?.status === 4 ? (
            <View
              style={{paddingHorizontal: scale(20), paddingBottom: scale(20)}}>
              <Button
                title="Submit Tanggal Terima"
                loading={loading}
                color={Colors.primary}
                onPress={this.submit}
              />
            </View>
          ) : (
            <View
              style={[
                this.getStyles(orderDetail?.status),
                styles.statusWrapper,
              ]}>
              <Text
                family="bold"
                color={
                  STATUS[orderDetail?.status - 1]?.textColor ??
                  Colors.fontSemiBlack
                }
                size={16}>
                {this.getItemStatus(orderDetail?.status)}
              </Text>
            </View>
          )}
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

const userSelector = (state: UserModel) => ({
  getDetailOrder: (params: string, callback: (res: any) => void) =>
    state.getDetailOrder(params, callback),
  getHome: () => state.getHome(),
  loading: state.loading,
  submitTerimaCabang: (params: any, callback: () => void) =>
    state.submitTerimaCabang(params, callback),
});

const stores = [{store: useUserStore, selector: userSelector}];

export default connect(stores)(OrderDetailScreen);
