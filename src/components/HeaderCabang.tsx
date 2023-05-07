import React, {useState} from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {scale} from '../services/Scale';
import {sessionStore} from '../stores/session/SessionStore';
import Images from '../themes/Images';
import Spacer from './Spacer';
import Colors from '../themes/Colors';
import Button from './Button';

type Props = {
  showLogout?: boolean;
};

const HeaderCabang: React.FC<Props> = ({showLogout}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onLogout = () => {
    sessionStore.getState().setLogin(false);
  };

  return (
    <View style={styles.cabangPadding}>
      <Text size={16} family="bold">
        {sessionStore.getState().user?.nama_toko}
      </Text>
      {showLogout && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={Images.iconSetting} style={styles.icon} />
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalBackground} />
        <View style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text size={18} family="bold">
                Informasi akun
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Image
                  source={Images.iconClose}
                  style={{width: scale(18), height: scale(18)}}
                />
              </TouchableOpacity>
            </View>
            <Spacer height={20} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={Images.iconAccount} style={styles.iconShow} />
              <Spacer width={15} />
              <View>
                <View style={{width: scale(190)}}>
                  <Text numberOfLines={1}>
                    Nama:{' '}
                    <Text family="bold">
                      {sessionStore.getState().user?.nama_toko}
                    </Text>
                  </Text>
                </View>
                <View style={{width: scale(190)}}>
                  <Text numberOfLines={1}>
                    Role: <Text family="bold">Cabang</Text>
                  </Text>
                </View>
              </View>
            </View>
            <Spacer height={20} />
            <View style={{width: scale(264)}}>
              <Button
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    onLogout();
                  }, 800);
                }}
                color={Colors.white}
                titleColor="red"
                border="red"
                title="Keluar"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cabangPadding: {
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
  iconShow: {
    width: scale(65),
    height: scale(65),
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
    paddingTop: scale(24),
    paddingBottom: scale(24),
    paddingHorizontal: scale(24),
    backgroundColor: Colors.white,
    borderRadius: scale(20),
  },
});

export default HeaderCabang;
