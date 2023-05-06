import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import {scale} from '../services/Scale';
import {sessionStore} from '../stores/session/SessionStore';

const HeaderCabang: React.FC = () => {
  return (
    <View style={styles.cabangPadding}>
      <Text size={16} family="bold">
        {sessionStore.getState().user?.nama_toko}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cabangPadding: {
    paddingTop: scale(20),
    paddingLeft: scale(20),
  },
});

export default HeaderCabang;
