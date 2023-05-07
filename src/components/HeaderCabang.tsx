import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Text from './Text';
import {scale} from '../services/Scale';
import {sessionStore} from '../stores/session/SessionStore';
import Images from '../themes/Images';

const HeaderCabang: React.FC = () => {
  return (
    <View style={styles.cabangPadding}>
      <Text size={16} family="bold">
        {sessionStore.getState().user?.nama_toko}
      </Text>
      <Image source={Images.iconAccount} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  cabangPadding: {
    paddingTop: scale(20),
    paddingLeft: scale(20),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    width: scale(24),
    height: scale(24),
  },
});

export default HeaderCabang;
