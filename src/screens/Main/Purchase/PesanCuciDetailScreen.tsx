import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import {connect} from '../../../services/ZustandHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Spacer from '../../../components/Spacer';
import Button from '../../../components/Button';
import Fonts from '../../../themes/Fonts';
import {STATUS} from '../../../const/Data';
import CustomDatePicker from '../../../components/DatePicker';
import dayjs from 'dayjs';
import DropdownAlertHolder from '../../../services/DropdownAlertHolder';

class PesanCuciDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataDetail: null,
      tglTerima: null,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    const {getPesanCuciDetail, route} = this.props;
    const {params} = route;
    getPesanCuciDetail(
      {id_order_cuci: params?.id_order_cuci},
      (response: any) => {
        this.setState({dataDetail: response});
      },
    );
  };

  getStyles = (status: number) => {
    return {backgroundColor: STATUS[status - 1]?.color || Colors.outlineBase};
  };

  getItemStatus = (status: number) => {
    return STATUS[status - 1]?.name;
  };

  submit = () => {
    const {dataDetail, tglTerima} = this.state;
    const {submitTerimaPesanCuci, getPesanCuci, getPesanCuciDetail} =
      this.props;

    let paramData = {
      id_order_cuci: dataDetail?.id_order_cuci,
    };

    if (dataDetail?.status === 4) {
      if (!tglTerima) {
        DropdownAlertHolder.showError('Gagal', 'Tanggal terima harus diisi');
      } else {
        paramData = {
          ...paramData,
          tgl_terima: `${dayjs(tglTerima).format('YYYY-MM-DD')} 00:00:00`,
        };
        submitTerimaPesanCuci(paramData, () => {
          this.onRefresh();
          getPesanCuci();
        });
      }
    }
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <View style={styles.flexCenter}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
          <Text color={Colors.primary}>Loading data</Text>
        </View>
      </View>
    );
  };

  render(): React.ReactNode {
    const {loading} = this.props;
    const {dataDetail} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
          <Spacer height={30} />
          <View style={{paddingHorizontal: scale(20)}}>
            <Image source={{uri: dataDetail?.url_foto}} style={styles.image} />

            <Spacer height={20} />
            <View style={styles.rowBetween}>
              <Text family="bold">Nomor Pesan</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.no_pesan}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Kode Produk</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.kd_produk}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Nama Barang</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.nama_barang}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Qty</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.qty}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Kadar</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.kadar}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Warna</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.warna || '-'}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Jenis Barang</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.jenis_barang}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Tanggal Pesan</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dayjs(dataDetail?.tgl_pesan, 'YYYY-MM-DD').format(
                  'DD/MM/YYYY',
                )}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            {dataDetail?.timestamp_proses ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Proses</Text>
                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dayjs(dataDetail?.timestamp_proses, 'YYYY-MM-DD').format(
                      'DD/MM/YYYY',
                    )}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
              </>
            ) : (
              <View />
            )}

            {dataDetail?.timestamp_kirim ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Kirim</Text>
                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dayjs(dataDetail?.timestamp_kirim, 'YYYY-MM-DD').format(
                      'DD/MM/YYYY',
                    )}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
              </>
            ) : (
              <View />
            )}

            {dataDetail?.status > 3 ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Terima</Text>
                  {dataDetail?.status === 4 ? (
                    <CustomDatePicker
                      title="Pilih Tanggal Terima"
                      defaultValue={this.state.tglTerima}
                      onSelectDate={d => this.setState({tglTerima: d})}
                    />
                  ) : (
                    <Text color={Colors.fontSemiBlack} lineHeight={20}>
                      {dayjs(dataDetail?.timestamp_terima, 'YYYY-MM-DD').format(
                        'DD/MM/YYYY',
                      )}
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
          <Spacer height={20} />
        </ScrollView>

        <View>
          {dataDetail?.status === 4 ? (
            <View
              style={{paddingHorizontal: scale(20), paddingBottom: scale(20)}}>
              <Button
                title="Submit"
                loading={loading}
                color={Colors.primary}
                onPress={this.submit}
              />
            </View>
          ) : (
            <View
              style={[
                this.getStyles(dataDetail?.status),
                styles.statusWrapper,
              ]}>
              <Text
                family="bold"
                color={
                  STATUS[dataDetail?.status - 1]?.textColor ??
                  Colors.fontSemiBlack
                }
                size={16}>
                {this.getItemStatus(dataDetail?.status)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: scale(320),
    height: scale(200),
    resizeMode: 'cover',
    backgroundColor: Colors.outlineBase,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  border: {
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: 0.6,
  },
  selectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: 1,
    paddingBottom: scale(10),
  },
  tableWrap: {
    marginHorizontal: scale(20),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.outlineBase,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineBase,
  },
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: Colors.outlineBase,
  },
  alignCenter: {
    paddingVertical: scale(10),
    alignItems: 'center',
  },
  backgroundGreen: {
    backgroundColor: Colors.primary,
  },
  btnAdd: {
    backgroundColor: Colors.greenlight,
    width: scale(40),
    alignItems: 'center',
    borderRadius: scale(8),
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: scale(360),
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalWrapper: {
    width: scale(312),
    padding: scale(24),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.outlineBase,
    marginTop: scale(10),
    borderRadius: scale(8),
    paddingLeft: scale(20),
    fontFamily: Fonts.type.regular,
    color: Colors.fontBlack,
  },
  statusWrapper: {
    paddingVertical: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPesanCuciDetail: (
    params: {idOrderCuci: string},
    callback: (response: any) => void,
  ) => state.getPesanCuciDetail(params, callback),
  getPesanCuci: () => state.getPesanCuci({page: 1, per_page: 20}),
  submitTerimaPesanCuci: (params: any, callback: () => void) =>
    state.submitTerimaPesanCuci(params, callback),
  loading: state.loading,
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(PesanCuciDetailScreen);
