import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../themes/Colors';
import {scale} from '../../../services/Scale';
import Text from '../../../components/Text';
import NavigationServices from '../../../services/NavigationServices';
import {connect} from '../../../services/ZustandHelper';
import usePurchaseStore from '../../../stores/purchase/PurchaseStore';
import PurchaseModel from '../../../models/PurchaseModel';
import Images from '../../../themes/Images';
import OrderCard from '../../../components/OrderCard';
import Spacer from '../../../components/Spacer';
import {sessionStore} from '../../../stores/session/SessionStore';

const STATUS = [
  {
    name: 'New',
    color: Colors.outlineBase,
    textColor: Colors.fontBlack,
  },
  {
    name: 'Proses',
    color: `${Colors.yellow}40`,
    textColor: Colors.fontBlack,
  },
];

class HomeCuciScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      statusSelected: undefined,
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      const role = sessionStore.getState().user?.id_role;
      if (role === 3) {
        this.onRefresh();
      }
    }, 300);
  }

  onRefresh = () => {
    const {getPusatPesanCuci} = this.props;
    const {statusSelected} = this.state;
    if (typeof statusSelected === 'number') {
      getPusatPesanCuci({status: statusSelected + 1});
    } else {
      getPusatPesanCuci();
    }
  };

  render(): React.ReactNode {
    const {loading, pusatPesanCuci} = this.props;
    const {modalVisible, statusSelected} = this.state;
    const pusatPesanCuciLists = pusatPesanCuci?.data || [];

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

        <View style={styles.searchWrapper}>
          <Text>
            {typeof statusSelected === 'number'
              ? STATUS[statusSelected]?.name
              : 'Filter status'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.setState({modalVisible: true})}>
              <Image source={Images.iconFilter} style={styles.dropdown} />
            </TouchableOpacity>
            {typeof statusSelected === 'number' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  this.setState({statusSelected: undefined}, () => {
                    setTimeout(() => {
                      this.onRefresh();
                    }, 500);
                  })
                }>
                <Image source={Images.iconClose} style={styles.close} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <FlatList
          data={pusatPesanCuciLists}
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
                    NavigationServices.navigate(
                      'PusatPesanCuciDetailScreen',
                      item,
                    );
                  }}
                />
              </View>
            );
          }}
          onRefresh={this.onRefresh}
          refreshing={loading}
          contentContainerStyle={
            pusatPesanCuciLists?.length
              ? styles.paddingHorizontal
              : styles.emptyContainer
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
        <Modal transparent visible={modalVisible}>
          <View style={styles.modalBackground} />
          <View style={styles.modalContainer}>
            <View style={styles.modalWrapper}>
              <Text size={16} family="bold">
                Pilih Status
              </Text>
              <Spacer height={10} />
              <View style={{alignItems: 'center'}}>
                {STATUS.map((s, index) => {
                  const isSelected = index === statusSelected;
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        this.setState(
                          {
                            modalVisible: false,
                            statusSelected: index,
                          },
                          () => {
                            this.onRefresh();
                          },
                        )
                      }
                      style={{
                        backgroundColor: isSelected
                          ? Colors.primary
                          : Colors.white,
                        borderColor: Colors.outlineBase,
                        borderWidth: 1,
                        width: scale(320),
                        borderRadius: scale(8),
                        marginVertical: scale(2),
                        alignItems: 'center',
                        paddingVertical: scale(10),
                      }}>
                      <Text color={isSelected ? Colors.white : Colors.black}>
                        {s.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </Modal>
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  dropdown: {
    width: scale(20),
    height: scale(20),
  },
  close: {
    tintColor: 'red',
    width: scale(17),
    height: scale(17),
    marginLeft: scale(20),
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: scale(10),
    marginHorizontal: scale(20),
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(10),
  },
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
  modalBackground: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: scale(360),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    paddingBottom: scale(40),
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
});

const purchaseSelector = (state: PurchaseModel) => ({
  getPusatPesanCuci: (params: string) => state.getPusatPesanCuci(params),
  pusatPesanCuci: state.pusatPesanCuci,
  loading: state.loading,
});

const stores = [{store: usePurchaseStore, selector: purchaseSelector}];

export default connect(stores)(HomeCuciScreen);
