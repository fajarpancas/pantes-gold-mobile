import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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

class OrderBuyDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      qtyAcc: null,
      modalVisible: false,
      orderBuyDetail: undefined,
      modalQtyShow: false,
      submitId: null,
      maxQtyAcc: 0,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    const {getPesanBeliDetail, route} = this.props;
    const {params} = route;

    getPesanBeliDetail({kd_produk: params?.kd_produk}, (response: any) => {
      this.setState({orderBuyDetail: response});
    });
  };

  submit = () => {
    const {submitId, qtyAcc} = this.state;
    const {submitQtyPesanBeli} = this.props;
    const params = {
      id_order: submitId,
      qty_acc: Number(qtyAcc),
    };

    submitQtyPesanBeli(params, () => {
      this.onRefresh();
      this.setState({modalQtyShow: false});
    });
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

  renderBodyTable = (
    val1: string,
    val2: string,
    val3: string,
    val4: string,
    val5?: string,
  ) => {
    return (
      <View style={styles.row}>
        <View
          style={[styles.borderRight, styles.alignCenter, {width: scale(40)}]}>
          <Text>{val1}</Text>
        </View>
        <View
          style={[styles.borderRight, styles.alignCenter, {width: scale(60)}]}>
          <Text>{val2}</Text>
        </View>
        <View
          style={[styles.borderRight, styles.alignCenter, {width: scale(119)}]}>
          <Text>{val3}</Text>
        </View>
        <View
          style={[styles.borderRight, styles.alignCenter, {width: scale(40)}]}>
          <Text>{val4}</Text>
        </View>
        <View
          style={[styles.borderRight, styles.alignCenter, {width: scale(60)}]}>
          {val5 ? (
            <Text>{val5}</Text>
          ) : (
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  submitId: val2,
                  maxQtyAcc: val4,
                  modalQtyShow: true,
                })
              }
              style={styles.btnAdd}>
              <Text size={18} family="bold">
                +
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  render(): React.ReactNode {
    const {loading} = this.props;
    const {modalQtyShow, orderBuyDetail} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
          <Spacer height={30} />
          <View style={{paddingHorizontal: scale(20)}}>
            <Image
              source={{uri: orderBuyDetail?.url_foto}}
              style={styles.image}
            />

            <Spacer height={20} />
            <View style={styles.rowBetween}>
              <Text family="bold">Kode Produk</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderBuyDetail?.kd_produk}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Keterangan Produk</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderBuyDetail?.keterangan_produk}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Pabrik</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderBuyDetail?.nama_pabrik}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />
          </View>
          <Spacer height={20} />

          <View style={styles.tableWrap}>
            <View style={styles.row}>
              <View
                style={[
                  styles.backgroundGreen,
                  styles.borderRight,
                  styles.alignCenter,
                  {width: scale(40)},
                ]}>
                <Text color={Colors.white}>No.</Text>
              </View>
              <View
                style={[
                  styles.backgroundGreen,
                  styles.borderRight,
                  styles.alignCenter,
                  {width: scale(60)},
                ]}>
                <Text color={Colors.white}>Id Pesan</Text>
              </View>
              <View
                style={[
                  styles.backgroundGreen,
                  styles.borderRight,
                  styles.alignCenter,
                  {width: scale(119)},
                ]}>
                <Text color={Colors.white}>Cabang</Text>
              </View>
              <View
                style={[
                  styles.backgroundGreen,
                  styles.borderRight,
                  styles.alignCenter,
                  {width: scale(40)},
                ]}>
                <Text color={Colors.white}>Qty</Text>
              </View>
              <View
                style={[
                  styles.backgroundGreen,
                  styles.borderRight,
                  styles.alignCenter,
                  {width: scale(60)},
                ]}>
                <Text color={Colors.white}>Qty Acc</Text>
              </View>
            </View>
            {orderBuyDetail?.data?.length > 0 ? (
              orderBuyDetail?.data?.map((item: any, index: Number) => {
                return this.renderBodyTable(
                  String(index + 1),
                  item?.id_order,
                  item?.nama_cabang,
                  item?.qty,
                  item?.qty_acc,
                );
              })
            ) : (
              <View
                style={[
                  {
                    flex: 1,
                    alignItems: 'center',
                    borderBottomColor: Colors.outlineBase,
                    borderBottomWidth: 1,
                  },
                  styles.borderRight,
                ]}>
                <Spacer height={20} />
                <Text>Belum ada pesanan</Text>
                <Spacer height={20} />
              </View>
            )}
          </View>

          <Spacer height={20} />

          <Modal visible={modalQtyShow} transparent>
            <View style={styles.modalBackground} />
            <View style={styles.modalContainer}>
              <View style={styles.modalWrapper}>
                <Text>Qty</Text>
                <TextInput
                  placeholder="Masukkan qty acc"
                  keyboardType="number-pad"
                  maxLength={3}
                  onChangeText={t => this.setState({qtyAcc: t})}
                  style={styles.textInput}
                  placeholderTextColor={Colors.outlineBase}
                />
                <Spacer height={3} />
                <Text size={9}>qty acc tidak boleh lebih dari qty request</Text>
                <Spacer height={10} />
                <Button
                  loading={loading}
                  disabled={
                    this.state.qtyAcc === null ||
                    this.state.qtyAcc > this.state.maxQtyAcc
                  }
                  title="Submit"
                  color={Colors.primary}
                  titleColor="white"
                  onPress={this.submit}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
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
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPesanBeliDetail: (
    params: {kd_produk: string},
    callback: (response: any) => void,
  ) => state.getPesanBeliDetail(params, callback),
  loading: state.loading,
  submitQtyPesanBeli: (params: any, callback: () => void) =>
    state.submitQtyPesanBeli(params, callback),
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(OrderBuyDetailScreen);
