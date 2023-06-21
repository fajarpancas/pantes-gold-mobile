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
import Button from '../../../components/Button';
import Fonts from '../../../themes/Fonts';
import dayjs from 'dayjs';
import {STATUS} from '../../../const/Data';
import DropdownAlertHolder from '../../../services/DropdownAlertHolder';
import CustomDatePicker from '../../../components/DatePicker';

class PurchaseOrderDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      orderDetail: undefined,
      qtyAda: 0,
      qtyCuci: 0,
      qtyBeli: 0,
      noPo: null,
      tglTerimaPusat: null,
      tanggalBeliPusat: null,
      tgl_kirim: null,
      tanggalTerimaCabang: null,
      tanggalClosed: null,
    };
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onRefresh = () => {
    const {getPurchaseOrderDetail, route} = this.props;
    const {params} = route;

    getPurchaseOrderDetail({id_order: params?.id_order}, (response: any) => {
      this.setState({orderDetail: response});
    });
  };

  submit = () => {
    const {
      orderDetail,
      qtyAda,
      qtyBeli,
      noPO,
      tglTerimaPusat,
      tanggalBeliPusat,
      tglKirim,
      tanggalTerimaCabang,
      tanggalClosed,
    } = this.state;
    const {submitPurchaseOrder, getPurchaseOrder, route} = this.props;
    const {params} = route;

    let paramData = {
      id_order: orderDetail?.id_order,
    };

    if (orderDetail?.status === 1) {
      if (!qtyAda || !qtyBeli) {
        DropdownAlertHolder.showError(
          'Gagal',
          'Qty ada dan qty beli harus diisi',
        );
      } else {
        paramData = {
          ...paramData,
          qty_ada: qtyAda,
          qty_beli: qtyBeli,
        };
        submitPurchaseOrder(paramData, () => {
          this.onRefresh();
          let paramFilter = {};

          if (params?.filter?.cabangSelected) {
            paramFilter = {
              ...paramFilter,
              kd_toko: params?.filter?.cabangSelected?.kd_toko,
            };
          }

          if (typeof params?.filter?.statusSelected === 'number') {
            paramFilter = {
              ...paramFilter,
              status: Number(params?.filter?.statusSelected) + 1,
            };
          }

          getPurchaseOrder(paramFilter);
        });
      }
    }

    if (orderDetail?.status === 2) {
      if (!noPO || !tanggalBeliPusat) {
        DropdownAlertHolder.showError(
          'Gagal',
          'Tanggal beli dan nomor PO harus diisi',
        );
      } else {
        paramData = {
          ...paramData,
          no_po: Number(noPO),
          tgl_beli_pusat: `${dayjs(tanggalBeliPusat).format(
            'YYYY-MM-DD',
          )} 00:00:00`,
        };
        submitPurchaseOrder(paramData, () => {
          this.onRefresh();
          let paramFilter = {};

          if (params?.filter?.cabangSelected) {
            paramFilter = {
              ...paramFilter,
              kd_toko: params?.filter?.cabangSelected?.kd_toko,
            };
          }

          if (typeof params?.filter?.statusSelected === 'number') {
            paramFilter = {
              ...paramFilter,
              status: Number(params?.filter?.statusSelected) + 1,
            };
          }

          getPurchaseOrder(paramFilter);
        });
      }
    }

    if (orderDetail?.status === 3) {
      if (!orderDetail?.timestamp_terima_beli) {
        if (!tglTerimaPusat) {
          DropdownAlertHolder.showError(
            'Gagal',
            'Tanggal terima pusat harus diisi',
          );
        } else {
          paramData = {
            ...paramData,
            tgl_terima_pusat: `${dayjs(tglTerimaPusat).format(
              'YYYY-MM-DD',
            )} 00:00:00`,
          };
          submitPurchaseOrder(paramData, () => {
            this.onRefresh();
            let paramFilter = {};

            if (params?.filter?.cabangSelected) {
              paramFilter = {
                ...paramFilter,
                kd_toko: params?.filter?.cabangSelected?.kd_toko,
              };
            }

            if (typeof params?.filter?.statusSelected === 'number') {
              paramFilter = {
                ...paramFilter,
                status: Number(params?.filter?.statusSelected) + 1,
              };
            }

            getPurchaseOrder(paramFilter);
          });
        }
      } else {
        if (!tglKirim) {
          DropdownAlertHolder.showError('Gagal', 'Tanggal kirim harus diisi');
        } else {
          paramData = {
            ...paramData,
            tgl_kirim: `${dayjs(tglKirim).format('YYYY-MM-DD')} 00:00:00`,
          };
          submitPurchaseOrder(paramData, () => {
            this.onRefresh();
            let paramFilter = {};

            if (params?.filter?.cabangSelected) {
              paramFilter = {
                ...paramFilter,
                kd_toko: params?.filter?.cabangSelected?.kd_toko,
              };
            }

            if (typeof params?.filter?.statusSelected === 'number') {
              paramFilter = {
                ...paramFilter,
                status: Number(params?.filter?.statusSelected) + 1,
              };
            }

            getPurchaseOrder(paramFilter);
          });
        }
      }
    }

    // if (orderDetail?.status === 4) {
    //   if (!tanggalTerimaCabang) {
    //     DropdownAlertHolder.showError(
    //       'Gagal',
    //       'Tanggal terima cabang harus diisi',
    //     );
    //   } else {
    //     paramData = {
    //       ...paramData,
    //       tgl_terima: `${dayjs(tanggalTerimaCabang).format(
    //         'YYYY-MM-DD',
    //       )} 00:00:00`,
    //     };
    //     submitPurchaseOrder(paramData, () => {
    //       this.onRefresh();
    //       let paramFilter = {};

    //       if (params?.filter?.cabangSelected) {
    //         paramFilter = {
    //           ...paramFilter,
    //           kd_toko: params?.filter?.cabangSelected?.kd_toko,
    //         };
    //       }

    //       if (typeof params?.filter?.statusSelected === 'number') {
    //         paramFilter = {
    //           ...paramFilter,
    //           status: Number(params?.filter?.statusSelected) + 1,
    //         };
    //       }

    //       getPurchaseOrder(paramFilter);
    //     });
    //   }
    // }

    if (orderDetail?.status === 5) {
      if (!tanggalClosed) {
        DropdownAlertHolder.showError('Gagal', 'Tanggal closed harus diisi');
      } else {
        paramData = {
          ...paramData,
          tgl_closed: `${dayjs(tanggalClosed).format('YYYY-MM-DD')} 00:00:00`,
        };
        submitPurchaseOrder(paramData, () => {
          this.onRefresh();
          let paramFilter = {};

          if (params?.filter?.cabangSelected) {
            paramFilter = {
              ...paramFilter,
              kd_toko: params?.filter?.cabangSelected?.kd_toko,
            };
          }

          if (typeof params?.filter?.statusSelected === 'number') {
            paramFilter = {
              ...paramFilter,
              status: Number(params?.filter?.statusSelected) + 1,
            };
          }

          getPurchaseOrder(paramFilter);
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
    const {orderDetail} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
          <Spacer height={20} />
          <View style={{marginLeft: scale(20)}}>
            <Text size={16}>{orderDetail?.nama_toko}</Text>
          </View>
          <Spacer height={20} />
          <View style={{paddingHorizontal: scale(20)}}>
            <Image source={{uri: orderDetail?.url_foto}} style={styles.image} />

            <Spacer height={20} />
            <View style={styles.rowBetween}>
              <Text family="bold">Status</Text>
              <View
                style={{
                  paddingHorizontal: scale(15),
                  borderRadius: scale(8),
                  backgroundColor: orderDetail?.status
                    ? STATUS[orderDetail?.status - 1]?.color
                    : Colors.outlineBase,
                }}>
                <Text
                  family="semiBold"
                  color={
                    orderDetail?.status
                      ? STATUS[orderDetail?.status - 1]?.textColor
                      : Colors.fontSemiBlack
                  }
                  lineHeight={20}>
                  {orderDetail?.status
                    ? STATUS[orderDetail?.status - 1]?.name
                    : '-'}
                </Text>
              </View>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Nama Barang</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderDetail?.nama_barang}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Tanggal Pesan</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dayjs(orderDetail?.created_at).format('DD/MM/YYYY')}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">No. Pesan</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderDetail?.id_order}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Kadar</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderDetail?.kadar}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Jenis Barang</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderDetail?.jenis_barang ?? '-'}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Qty</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderDetail?.qty}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Berat</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {orderDetail?.berat}
              </Text>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Qty Ada</Text>
              {orderDetail?.status === 1 ? (
                <TextInput
                  placeholder="0"
                  placeholderTextColor={Colors.outlineBase}
                  style={styles.textInput2}
                  keyboardType="number-pad"
                  onChangeText={text => this.setState({qtyAda: text})}
                />
              ) : (
                <Text color={Colors.fontSemiBlack} lineHeight={20}>
                  {orderDetail?.qty_beli + orderDetail?.qty_cuci || '0'}
                </Text>
              )}
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            <View style={styles.rowBetween}>
              <Text family="bold">Qty Beli</Text>
              {orderDetail?.status === 1 ? (
                <TextInput
                  placeholder="0"
                  placeholderTextColor={Colors.outlineBase}
                  style={styles.textInput2}
                  keyboardType="number-pad"
                  onChangeText={text => this.setState({qtyBeli: text})}
                />
              ) : (
                <Text color={Colors.fontSemiBlack} lineHeight={20}>
                  {orderDetail?.qty_beli}
                </Text>
              )}
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

            {orderDetail?.status > 1 ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Beli</Text>
                  {orderDetail?.status === 2 ? (
                    <CustomDatePicker
                      title="Pilih Tanggal Beli Pusat"
                      defaultValue={this.state.tanggalBeliPusat}
                      onSelectDate={d => this.setState({tanggalBeliPusat: d})}
                    />
                  ) : (
                    <Text color={Colors.fontSemiBlack} lineHeight={20}>
                      {dayjs(orderDetail?.timestamp_beli, 'YYYY-MM-DD').format(
                        'DD/MM/YYYY',
                      )}
                    </Text>
                  )}
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />

                <View style={styles.rowBetween}>
                  <Text family="bold">No PO</Text>
                  {orderDetail?.status === 2 ? (
                    <TextInput
                      placeholder="0"
                      placeholderTextColor={Colors.outlineBase}
                      style={styles.textInput2}
                      onChangeText={text => this.setState({noPO: text})}
                    />
                  ) : (
                    <Text color={Colors.fontSemiBlack} lineHeight={20}>
                      {orderDetail?.no_po ?? '-'}
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

            {orderDetail?.status > 2 ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Terima Pusat</Text>
                  {orderDetail?.status === 3 ? (
                    <CustomDatePicker
                      title="Pilih Tanggal Terima Pusat"
                      defaultValue={this.state.tglTerimaPusat}
                      onSelectDate={d => this.setState({tglTerimaPusat: d})}
                    />
                  ) : (
                    <Text color={Colors.fontSemiBlack} lineHeight={20}>
                      {dayjs(
                        orderDetail?.timestamp_terima_beli,
                        'YYYY-MM-DD',
                      ).format('DD/MM/YYYY')}
                    </Text>
                  )}
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />

                {orderDetail?.timestamp_terima_beli ? (
                  <>
                    <View style={styles.rowBetween}>
                      <Text family="bold">Tanggal Kirim</Text>
                      {orderDetail?.status === 3 ? (
                        <CustomDatePicker
                          title="Pilih Tanggal Kirim"
                          defaultValue={this.state.tglKirim}
                          onSelectDate={d => this.setState({tglKirim: d})}
                        />
                      ) : (
                        <Text color={Colors.fontSemiBlack} lineHeight={20}>
                          {dayjs(
                            orderDetail?.timestamp_kirim_cabang,
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
              </>
            ) : (
              <View />
            )}

            {orderDetail?.timestamp_terima_cabang ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Terima Cabang</Text>

                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dayjs(
                      orderDetail?.timestamp_terima_cabang,
                      'YYYY-MM-DD',
                    ).format('DD/MM/YYYY')}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
              </>
            ) : (
              <View />
            )}

            {orderDetail?.status > 4 && orderDetail?.status !== 6 ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Closed</Text>
                  {orderDetail?.status === 5 ? (
                    <CustomDatePicker
                      title="Pilih Tanggal Closed"
                      defaultValue={this.state.tanggalClosed}
                      onSelectDate={d => this.setState({tanggalClosed: d})}
                    />
                  ) : (
                    <Text color={Colors.fontSemiBlack} lineHeight={20}>
                      {dayjs(
                        orderDetail?.timestamp_closed,
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

            {orderDetail?.status !== 4 ? (
              <>
                <Spacer height={10} />
                {orderDetail?.status < 6 ? (
                  <Button
                    title="Submit"
                    loading={loading}
                    color={Colors.primary}
                    onPress={this.submit}
                  />
                ) : (
                  <View style={{alignSelf: 'center'}}>
                    <Text color={'grey'}>Pesanan ini sudah close.</Text>
                  </View>
                )}
              </>
            ) : (
              <View />
            )}
          </View>
          <Spacer height={40} />
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
  textInput: {
    borderWidth: 1,
    borderColor: Colors.outlineBase,
    marginTop: scale(10),
    borderRadius: scale(8),
    paddingLeft: scale(20),
    fontFamily: Fonts.type.regular,
    color: Colors.fontBlack,
  },
  textInput2: {
    width: scale(50),
    height: scale(40),
    borderWidth: 1,
    textAlign: 'center',
    borderColor: Colors.outlineBase,
    borderRadius: scale(8),
    color: Colors.fontSemiBlack,
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  loading: state.loading,
  submitPurchaseOrder: (params: any, callback: () => void) =>
    state.submitPurchaseOrder(params, callback),
  getPurchaseOrderDetail: (params: any, callback: () => void) =>
    state.getPurchaseOrderDetail(params, callback),
  getPurchaseOrder: (params: string) => state.getPurchaseOrder(params),
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(PurchaseOrderDetailScreen);
