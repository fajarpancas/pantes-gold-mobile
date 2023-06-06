import React, {useState} from 'react';
import {
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
import Button from '../../../components/Button';

type Props = {
  cabang: {
    kd_toko: string;
    nama_toko: string;
    alamat: string;
  }[];
  selected: any[];
  modalVisible: boolean;
  onHide: () => void;
  onSelected: (params: string[]) => void;
};

const ModalMutipleSelectCabang: React.FC<Props> = props => {
  const {cabang, modalVisible, selected, onHide, onSelected} = props;
  const [selectedData, setSelectedData] = useState(selected);

  return (
    <Modal visible={modalVisible} animationType="slide" transparent>
      <View style={styles.modalBackground} />
      <View style={styles.modalContainer}>
        <View style={styles.modalWrapper}>
          <Spacer height={20} />
          <View style={styles.selectCabangHeader}>
            <Text size={16} family="bold">
              Pilih Cabang/Toko
            </Text>
            <TouchableOpacity onPress={onHide}>
              <Image
                source={Images.iconClose}
                style={{width: scale(18), height: scale(18)}}
              />
            </TouchableOpacity>
          </View>

          <Spacer height={20} />
          <ScrollView style={{paddingHorizontal: scale(20)}}>
            {cabang?.length
              ? cabang.map(c => {
                  const selectedDataIds = selectedData?.map(
                    item => item?.kd_toko,
                  );
                  const isSelected = selectedDataIds.includes(c?.kd_toko);

                  return (
                    <TouchableOpacity
                      onPress={() => {
                        let newValue = selectedData;
                        if (
                          selectedDataIds?.length &&
                          selectedDataIds?.includes(c?.kd_toko)
                        ) {
                          newValue = newValue.filter(
                            (cs: any) => cs?.kd_toko !== c?.kd_toko,
                          );
                        } else {
                          newValue.push(c);
                        }
                        setSelectedData([...newValue]);
                      }}
                      style={styles.cabangItem}>
                      <View style={{flexDirection: 'row', flex: 1}}>
                        <Text> ({c.alamat}) </Text>
                        <Text>{c.nama_toko}.</Text>
                      </View>
                      <View
                        style={{
                          marginRight: scale(5),
                          borderWidth: 1,
                          width: scale(15),
                          height: scale(15),
                          borderColor: Colors.fontSemiBlack,
                          borderRadius: scale(4),
                        }}>
                        {isSelected ? (
                          <Image
                            source={Images.iconCheck}
                            style={{
                              width: scale(24),
                              height: scale(24),
                              resizeMode: 'contain',
                              marginLeft: scale(-5),
                              marginTop: scale(-7),
                            }}
                          />
                        ) : (
                          <View />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null}
            <Spacer height={10} />
            <Button
              color={Colors.primary}
              title="Selesai"
              onPress={() => {
                onSelected(selectedData);
                onHide();
              }}
            />
          </ScrollView>
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

export default ModalMutipleSelectCabang;
