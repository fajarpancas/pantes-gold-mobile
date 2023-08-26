import React from 'react';
import {
  ActivityIndicator,
  Image,
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
import Fonts from '../../../themes/Fonts';
import {STATUS} from '../../../const/Data';
import Button from '../../../components/Button';
import DropdownAlertHolder from '../../../services/DropdownAlertHolder';
import CustomDatePicker from '../../../components/DatePicker';
import dayjs from 'dayjs';

class PusatPesanCuciDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      qtyAcc: null,
      dataDetail: null,
      tglKirim: null,
      tglClosed: null,
      jenisKirim: 'full',
      qtyKirimSebagian: 0,
      notes: null,
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
    const {dataDetail, qtyAcc, tglKirim, tglClosed} = this.state;
    const {submitPusatPesanCuci, getPusatPesanCuci} = this.props;

    let paramData = {
      id_order_cuci: dataDetail?.id_order_cuci,
    };

    if (dataDetail?.status === 1) {
      if (!qtyAcc) {
        DropdownAlertHolder.showError('Gagal', 'Qty acc harus diisi');
      } else {
        paramData = {
          ...paramData,
          qty_acc: qtyAcc,
        };
        submitPusatPesanCuci(paramData, () => {
          this.onRefresh();
          getPusatPesanCuci();
        });
      }
    }

    if (dataDetail?.status === 2) {
      if (this.state.jenisKirim === 'full') {
        if (!tglKirim) {
          DropdownAlertHolder.showError('Gagal', 'Tanggal kirim harus diisi');
        } else {
          paramData = {
            ...paramData,
            tgl_kirim: `${dayjs(tglKirim).format('YYYY-MM-DD')} 00:00:00`,
          };
          submitPusatPesanCuci(paramData, () => {
            this.onRefresh();
            getPusatPesanCuci();
          });
        }
      } else {
        if (!tglKirim || !this.state.qtyKirimSebagian) {
          DropdownAlertHolder.showError(
            'Gagal',
            'Tanggal kirim dan qty yang dikirim sebagian harus diisi',
          );
        } else {
          paramData = {
            ...paramData,
            qty_kirim: this.state.qtyKirimSebagian,
            notes: this.state.notes || '-',
            tgl_kirim: `${dayjs(tglKirim).format('YYYY-MM-DD')} 00:00:00`,
          };
          submitPusatPesanCuci(paramData, () => {
            this.onRefresh();
            getPusatPesanCuci();
          });
        }
      }
    }

    if (dataDetail?.status === -1) {
      if (!tglKirim) {
        DropdownAlertHolder.showError('Gagal', 'Tanggal kirim harus diisi');
      } else {
        paramData = {
          ...paramData,
          tgl_kirim: `${dayjs(tglKirim).format('YYYY-MM-DD')} 00:00:00`,
        };
        submitPusatPesanCuci(paramData, () => {
          this.onRefresh();
          getPusatPesanCuci();
        });
      }
    }

    if (dataDetail?.status === 5) {
      if (!tglClosed) {
        DropdownAlertHolder.showError('Gagal', 'Tanggal closed harus diisi');
      } else {
        paramData = {
          ...paramData,
          tgl_closed: `${dayjs(tglClosed).format('YYYY-MM-DD')} 00:00:00`,
        };
        submitPusatPesanCuci(paramData, () => {
          this.onRefresh();
          getPusatPesanCuci();
        });
      }
    }
  };

  getStyles = (status: number) => {
    if (status > 0) {
      return {backgroundColor: STATUS[status - 1]?.color || Colors.outlineBase};
    }
    return {backgroundColor: 'yellow'};
  };

  getItemStatus = (status: number) => {
    return STATUS[status - 1]?.name || 'Kirim Sebagian';
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
              <Text family="bold">Status</Text>
              <View
                style={{
                  paddingHorizontal: scale(15),
                  borderRadius: scale(8),
                  backgroundColor: dataDetail?.status
                    ? STATUS[dataDetail?.status - 1]?.color
                    : Colors.outlineBase,
                }}>
                <Text
                  family="semiBold"
                  color={
                    dataDetail?.status
                      ? STATUS[dataDetail?.status - 1]?.textColor
                      : Colors.fontSemiBlack
                  }
                  lineHeight={20}>
                  {dataDetail?.status
                    ? STATUS[dataDetail?.status - 1]?.name
                    : '-'}
                </Text>
              </View>
            </View>
            <Spacer height={5} />
            <View style={styles.border} />
            <Spacer height={10} />

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
              <Text family="bold">Qty Acc</Text>
              {dataDetail?.status === 1 ? (
                <TextInput
                  placeholder="0"
                  placeholderTextColor={Colors.outlineBase}
                  style={styles.textInput2}
                  keyboardType="number-pad"
                  onChangeText={text => this.setState({qtyAcc: text})}
                />
              ) : (
                <Text color={Colors.fontSemiBlack} lineHeight={20}>
                  {dataDetail?.qty_acc || '0'}
                </Text>
              )}
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

            {dataDetail?.warna ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Warna</Text>
                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dataDetail?.warna}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
              </>
            ) : null}

            <View style={styles.rowBetween}>
              <Text family="bold">Jenis Barang</Text>
              <Text color={Colors.fontSemiBlack} lineHeight={20}>
                {dataDetail?.jenis_barang}
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

            {dataDetail?.timestamp_kirim_sebagian ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Kirim sebagian</Text>
                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dayjs(
                      dataDetail?.timestamp_kirim_sebagian,
                      'YYYY-MM-DD',
                    ).format('DD/MM/YYYY')}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
                <View style={styles.rowBetween}>
                  <Text family="bold">Qty yang dikirim sebagian</Text>
                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dataDetail?.qty_kirim_sebagian}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
                <View style={styles.rowBetween}>
                  <Text family="bold">Catatan kirim sebagian</Text>
                  <View style={{width: scale(130), marginLeft: scale(50)}}>
                    <Text
                      textAlign="right"
                      color={Colors.fontSemiBlack}
                      lineHeight={20}>
                      {dataDetail?.as_notes || '-'}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <View />
            )}

            {dataDetail?.status > 1 ? (
              <>
                {dataDetail?.status === 2 ? (
                  <>
                    <View style={styles.rowBetween}>
                      <Text family="bold">Jenis Kirim</Text>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => this.setState({jenisKirim: 'full'})}
                          style={{
                            paddingHorizontal: scale(5),
                            paddingVertical: scale(2),
                            marginRight: scale(5),
                            backgroundColor:
                              this.state.jenisKirim === 'full'
                                ? Colors.primary
                                : 'transparent',
                            borderColor: Colors.border,
                            borderRadius: scale(5),
                            borderWidth:
                              this.state.jenisKirim === 'full' ? 0 : 1,
                          }}>
                          <Text
                            color={
                              this.state.jenisKirim === 'full'
                                ? Colors.white
                                : Colors.fontBlack
                            }>
                            Semua
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.setState({jenisKirim: 'half'})}
                          style={{
                            paddingHorizontal: scale(5),
                            paddingVertical: scale(2),
                            backgroundColor:
                              this.state.jenisKirim === 'half'
                                ? Colors.primary
                                : 'transparent',
                            borderColor: Colors.border,
                            borderWidth:
                              this.state.jenisKirim === 'half' ? 0 : 1,
                            borderRadius: scale(5),
                          }}>
                          <Text
                            color={
                              this.state.jenisKirim === 'half'
                                ? Colors.white
                                : Colors.fontBlack
                            }>
                            Sebagian
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Spacer height={5} />
                    <View style={styles.border} />
                    <Spacer height={10} />
                  </>
                ) : (
                  <View />
                )}
                {dataDetail?.status === 2 ? (
                  this.state.jenisKirim === 'half' ? (
                    <>
                      <View style={styles.rowBetween}>
                        <Text family="bold">Qty yang dikirim</Text>
                        <TextInput
                          placeholder="0"
                          placeholderTextColor={Colors.outlineBase}
                          style={styles.textInput2}
                          keyboardType="number-pad"
                          onChangeText={text =>
                            this.setState({qtyKirimSebagian: text})
                          }
                        />
                      </View>
                      <Spacer height={5} />
                      <View style={styles.border} />
                      <Spacer height={10} />
                      <View style={styles.rowBetween}>
                        <Text family="bold">Catatan</Text>
                        <TextInput
                          placeholder="Catatan"
                          numberOfLines={3}
                          placeholderTextColor={Colors.outlineBase}
                          style={styles.textInput3}
                          multiline
                          onChangeText={text => this.setState({notes: text})}
                        />
                      </View>
                      <Spacer height={5} />
                      <View style={styles.border} />
                      <Spacer height={10} />
                      <View style={styles.rowBetween}>
                        <Text family="bold">Tanggal Kirim</Text>
                        <CustomDatePicker
                          title="Pilih Tanggal Kirim"
                          defaultValue={this.state.tglKirim}
                          onSelectDate={d => this.setState({tglKirim: d})}
                        />
                      </View>
                    </>
                  ) : (
                    <View style={styles.rowBetween}>
                      <Text family="bold">Tanggal Kirim</Text>
                      <CustomDatePicker
                        title="Pilih Tanggal Kirim"
                        defaultValue={this.state.tglKirim}
                        onSelectDate={d => this.setState({tglKirim: d})}
                      />
                    </View>
                  )
                ) : (
                  <>
                    {dataDetail?.timestamp_kirim_sebagian ? (
                      <>
                        <Spacer height={5} />
                        <View style={styles.border} />
                        <Spacer height={10} />
                      </>
                    ) : null}
                    <View style={styles.rowBetween}>
                      <Text family="bold">Tanggal Kirim Semua</Text>
                      <Text color={Colors.fontSemiBlack} lineHeight={20}>
                        {dayjs(
                          dataDetail?.timestamp_kirim_cabang,
                          'YYYY-MM-DD',
                        ).format('DD/MM/YYYY')}
                      </Text>
                    </View>
                  </>
                )}
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
              </>
            ) : (
              <View />
            )}

            {dataDetail?.status === -1 ? (
              <>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Kirim Semua</Text>
                  <CustomDatePicker
                    title="Pilih Tanggal Kirim"
                    defaultValue={this.state.tglKirim}
                    onSelectDate={d => this.setState({tglKirim: d})}
                  />
                </View>
              </>
            ) : (
              <View />
            )}

            {dataDetail?.timestamp_terima_cabang ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Terima Cabang</Text>
                  <Text color={Colors.fontSemiBlack} lineHeight={20}>
                    {dayjs(
                      dataDetail?.timestamp_terima_cabang,
                      'YYYY-MM-DD',
                    ).format('DD/MM/YYYY')}
                  </Text>
                </View>
                <Spacer height={5} />
                <View style={styles.border} />
                <Spacer height={10} />
              </>
            ) : null}

            {dataDetail?.status === 5 ? (
              <>
                <View style={styles.rowBetween}>
                  <Text family="bold">Tanggal Closed</Text>
                  <CustomDatePicker
                    title="Pilih Tanggal Closed"
                    defaultValue={this.state.tglClosed}
                    onSelectDate={d => this.setState({tglClosed: d})}
                  />
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

        <Spacer height={10} />
        {dataDetail?.status !== 4 ? (
          <View
            style={{paddingHorizontal: scale(20), paddingBottom: scale(20)}}>
            {dataDetail?.status < 6 ? (
              <Button
                title={'Submit'}
                loading={loading}
                color={Colors.primary}
                onPress={this.submit}
              />
            ) : (
              <View style={{alignSelf: 'center'}}>
                <Text color={'grey'}>Pesanan ini sudah close.</Text>
                <Spacer height={20} />
              </View>
            )}
          </View>
        ) : (
          <View style={{alignSelf: 'center'}}>
            <Text color={'grey'}>Menunggu konfirmasi pusat beli.</Text>
            <Spacer height={20} />
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
    resizeMode: 'contain',
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
  textInput2: {
    width: scale(50),
    height: scale(40),
    borderWidth: 1,
    textAlign: 'center',
    borderColor: Colors.outlineBase,
    borderRadius: scale(8),
    color: Colors.fontSemiBlack,
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
  textInput3: {
    width: scale(200),
    borderWidth: 1,
    textAlign: 'left',
    paddingLeft: scale(10),
    paddingRight: scale(10),
    borderColor: Colors.outlineBase,
    borderRadius: scale(8),
    color: Colors.fontSemiBlack,
    textAlignVertical: 'top',
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPusatPesanCuci: () => state.getPusatPesanCuci({per_page: 20, page: 1}),
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
