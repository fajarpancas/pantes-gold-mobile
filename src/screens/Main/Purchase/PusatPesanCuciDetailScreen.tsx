import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import {connect} from '../../../services/ZustandHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Spacer from '../../../components/Spacer';
import Fonts from '../../../themes/Fonts';
import {STATUS} from '../../../const/Data';
import Button from '../../../components/Button';
import DropdownAlertHolder from '../../../services/DropdownAlertHolder';

class PusatPesanCuciDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      qtyAcc: null,
      dataDetail: null,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    const {getPusatPesanCuciDetail, route} = this.props;
    const {params} = route;
    getPusatPesanCuciDetail(
      {id_order_cuci: params?.id_order_cuci},
      (response: any) => {
        this.setState({dataDetail: response});
      },
    );
  };

  submit = () => {
    const {qtyAcc, dataDetail} = this.state;
    const {submitPusatPesanCuci, getPusatPesanCuci} = this.props;
    if (qtyAcc) {
      if (Number(qtyAcc) <= Number(dataDetail?.qty)) {
        submitPusatPesanCuci(
          {
            id_order_cuci: dataDetail?.id_order_cuci,
            qty_acc: qtyAcc,
          },
          () => {
            this.onRefresh();
            getPusatPesanCuci();
          },
        );
      } else {
        DropdownAlertHolder.showError(
          'Gagal',
          'Qty acc tidak boleh lebih dari qty permintaan',
        );
      }
    } else {
      DropdownAlertHolder.showError('Gagal', 'Qty acc harus diisi');
    }
  };

  getStyles = (status: number) => {
    return {backgroundColor: STATUS[status - 1]?.color || Colors.outlineBase};
  };

  getItemStatus = (status: number) => {
    return STATUS[status - 1]?.name;
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

            {typeof dataDetail?.qty_acc === 'string' ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Qty Acc</Text>
                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dataDetail?.qty_acc}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
              </>
            ) : (
              <View />
            )}

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
                {dataDetail?.tgl_pesan}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />
          </View>
          <Spacer height={20} />
        </ScrollView>

        {!loading && (
          <View>
            {typeof dataDetail?.qty_acc === 'string' ? (
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
            ) : (
              <View
                style={{
                  width: scale(320),
                  paddingBottom: scale(15),
                  alignSelf: 'center',
                }}>
                <TextInput
                  placeholder="Qty Acc"
                  placeholderTextColor={'grey'}
                  style={styles.textInput}
                  keyboardType="number-pad"
                  onChangeText={t => this.setState({qtyAcc: t})}
                />
                <Spacer height={10} />
                <Button
                  title="Submit Qty Acc"
                  color={Colors.primary}
                  onPress={this.submit}
                />
              </View>
            )}
          </View>
        )}
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
  getPusatPesanCuci: (params: string) => state.getPusatPesanCuci(params),
  getPusatPesanCuciDetail: (
    params: {idOrderCuci: string},
    callback: (response: any) => void,
  ) => state.getPusatPesanCuciDetail(params, callback),
  loading: state.loading,
  submitPusatPesanCuci: (params: any, callback: () => void) =>
    state.submitPusatPesanCuci(params, callback),
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(PusatPesanCuciDetailScreen);
