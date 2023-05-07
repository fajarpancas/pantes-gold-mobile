import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import Images from '../../themes/Images';
import OfferCard from '../../components/OfferCard';
import Fonts from '../../themes/Fonts';
import {
  GetOfferListParams,
  GetOrderListParams,
} from '../../models/apimodel/ApiRequest';
import UserModel from '../../models/UserModel';
import {connect} from '../../services/ZustandHelper';
import useUserStore from '../../stores/user/UserStore';
import {debounce} from 'debounce';

const imgOffer =
  'data:image/jpeg;base64,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';

const dummy = [
  {
    image: imgOffer,
    name: 'Gelang Naga',
  },
  {
    image: imgOffer,
    name: 'Kalung bintang melengkung',
  },
  {
    image: imgOffer,
    name: 'Gelang Emas',
  },
  {
    image: imgOffer,
    name: 'Cincin Komodo Hitam',
  },
];

class OfferScreen extends React.PureComponent {
  page = 1;
  search = '';

  constructor(props) {
    super(props);

    this.onSearch = debounce(this.onSearch.bind(this), 1000);
  }

  componentDidMount(): void {
    this.onRefresh();
  }

  onSearch() {
    this.onRefresh();
  }

  onRefresh = () => {
    const {getOfferList} = this.props;

    let paramData: GetOrderListParams = {
      per_page: 50,
      page: this.page,
    };

    if (this.search !== '') {
      paramData = {
        ...paramData,
        search: this.search,
      };
    }

    getOfferList(paramData);
  };

  render(): React.ReactNode {
    const {offerList, loading} = this.props;
    const listData = offerList?.data?.length ? offerList?.data : [];

    return (
      <View style={styles.container}>
        <FlatList
          data={listData}
          refreshing={loading}
          onRefresh={this.onRefresh}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.padding,
                  index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
                ]}>
                <OfferCard item={item} hideStatus />
              </View>
            );
          }}
          contentContainerStyle={
            listData?.length || this.search
              ? styles.paddingHorizontal
              : styles.emptyContainer
          }
          ListHeaderComponent={
            listData?.length || this.search ? (
              <>
                <Spacer height={5} />
                <View style={styles.rowFlex}>
                  <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                      <Image
                        source={Images.iconSearch}
                        style={styles.searchIcon}
                      />
                    </View>
                    <TextInput
                      placeholder="Nama barang..."
                      placeholderTextColor={'grey'}
                      defaultValue={this.search}
                      onChangeText={text => {
                        this.search = text;
                        this.onSearch();
                      }}
                      style={styles.textInput}
                    />
                  </View>
                </View>
                <Spacer height={10} />
              </>
            ) : (
              <View />
            )
          }
          numColumns={3}
          ListEmptyComponent={() => {
            if (!loading) {
              return (
                <View>
                  <Spacer height={60} />
                  <Image source={Images.iconEmpty} style={styles.emptyIcon} />
                  <Text size={16} textAlign="center" lineHeight={21.86}>
                    Barang yang anda cari{'\n'}tidak ditemukan
                  </Text>
                </View>
              );
            }
            return null;
          }}
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
  rowFlex: {
    flexDirection: 'row',
    width: scale(320),
  },
  submitSearchWrapper: {
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: scale(12),
    height: scale(40),
    paddingHorizontal: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(90),
    marginLeft: scale(10),
  },
  searchWrapper: {
    backgroundColor: Colors.white,
    width: scale(35),
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  searchContainer: {
    width: scale(320),
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  textInput: {
    width: scale(320),
    backgroundColor: Colors.white,
    fontFamily: Fonts.type.regular,
    fontSize: scale(14),
    color: Colors.fontBlack,
  },
  searchIcon: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
  },
});

const userSelector = (state: UserModel) => ({
  getOfferList: (params: GetOfferListParams) => state.getOfferList(params),
  offerList: state.offerList,
  loading: state.loading,
});

const stores = [{store: useUserStore, selector: userSelector}];

export default connect(stores)(OfferScreen);
