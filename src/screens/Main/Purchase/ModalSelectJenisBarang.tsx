import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Spacer from '../../../components/Spacer';
import Text from '../../../components/Text';
import Images from '../../../themes/Images';
import {scale} from '../../../services/Scale';
import Colors from '../../../themes/Colors';

type Props = {
  jenisBarang: {
    kd_barang: string;
    nama_jenis_barang: string;
  }[];
  modalVisible: boolean;
  onHide: () => void;
  onSelected: (c: {kd_barang: string; nama_jenis_barang: string}) => void;
  loading?: Boolean;
};

const ModalSelectJenisBarang: React.FC<Props> = props => {
  const {jenisBarang, modalVisible, onHide, onSelected, loading} = props;
  const [filterJenis, setFilterJenis] = useState(null);

  let jenisFiltered = jenisBarang;

  if (filterJenis) {
    jenisFiltered = jenisBarang?.filter(
      c => c.nama_jenis_barang === filterJenis,
    );
  }

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalBackground} />
      <View style={styles.modalContainer}>
        <View style={styles.modalWrapper}>
          <Spacer height={20} />
          <View style={styles.selectCabangHeader}>
            <Text size={16} family="bold">
              Pilih Jenis Barang
            </Text>
            <TouchableOpacity onPress={onHide}>
              <Image
                source={Images.iconClose}
                style={{width: scale(18), height: scale(18)}}
              />
            </TouchableOpacity>
          </View>

          <Spacer height={20} />
          {loading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <ScrollView style={{paddingHorizontal: scale(20)}}>
              {jenisFiltered?.length
                ? jenisFiltered.map(c => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          onSelected(c);
                          onHide();
                        }}
                        style={styles.cabangItem}>
                        <Text>{c?.nama_jenis_barang}.</Text>
                        <Text>{` (${c.kd_barang})`}</Text>
                      </TouchableOpacity>
                    );
                  })
                : null}
            </ScrollView>
          )}
          <Spacer height={40} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cabangItem: {
    flexDirection: 'row',
    height: scale(40),
    borderBottomColor: Colors.outlineBase,
    borderBottomWidth: scale(1),
    alignItems: 'center',
    backgroundColor: Colors.greenBg,
    borderRadius: scale(8),
    paddingHorizontal: scale(10),
    marginBottom: scale(5),
  },
  selectCabangHeader: {
    marginHorizontal: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectCabang: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: scale(45),
    borderRadius: scale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: scale(360),
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    maxHeight: '80%',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
});

export default ModalSelectJenisBarang;
