import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Colors from '../../themes/Colors';
import Spacer from '../../components/Spacer';
import {scale} from '../../services/Scale';
import Text from '../../components/Text';
import Images from '../../themes/Images';
import OfferCard from '../../components/OfferCard';
import Fonts from '../../themes/Fonts';
import {GetOfferListParams} from '../../models/apimodel/ApiRequest';
import UserModel from '../../models/UserModel';
import {connect} from '../../services/ZustandHelper';
import useUserStore from '../../stores/user/UserStore';
import {debounce} from 'debounce';
import NavigationServices from '../../services/NavigationServices';

class OfferScreen extends React.PureComponent {
  page = 1;
  search = '';

  constructor(props) {
    super(props);

    this.onSearch = debounce(this.onSearch.bind(this), 1000);
  }

  componentDidMount(): void {
    this.onRefresh(1);
  }

  onSearch() {
    const {offerList} = this.props;
    this.onRefresh(offerList?.current_page || 1);
  }

  onRefresh = (page: number) => {
    const {getOfferList} = this.props;

    let paramData: GetofferListParams = {
      per_page: 20,
      page,
    };

    if (this.search !== '') {
      paramData = {
        ...paramData,
        search: this.search,
      };
    }

    getOfferList(paramData);
  };

  onLoadMore = () => {
    const {loading, offerList} = this.props;

    if (!loading && offerList?.current_page < offerList?.last_page) {
      this.onRefresh(offerList?.current_page + 1);
    }
  };

  renderLoading = () => {
    const {loading, offerList} = this.props;
    if (loading && offerList?.current_page) {
      return (
        <View style={styles.flexCenter}>
          <Spacer height={10} />
          <ActivityIndicator size={'small'} color={Colors.primary} />
          <Spacer height={10} />
        </View>
      );
    }
    return null;
  };

  render(): React.ReactNode {
    const {offerList, loading} = this.props;
    const listData = offerList?.data?.length ? offerList?.data : [];

    return (
      <View style={styles.container}>
        <FlatList
          data={listData}
          refreshing={loading}
          onRefresh={() => this.onRefresh(1)}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  styles.padding,
                  index !== 0 && index % 3 !== 0 ? styles.paddingLeft10 : {},
                ]}>
                <OfferCard
                  item={item}
                  hideStatus
                  onPress={() =>
                    NavigationServices.navigate('OfferDetailScreen', item)
                  }
                />
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
          onEndReachedThreshold={1}
          onEndReached={(distance: any) => {
            console.tron.log('onEndReached ', distance);
            if (distance.distanceFromEnd > 110) {
              this.onLoadMore();
            }
          }}
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
          ListFooterComponent={this.renderLoading}
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
