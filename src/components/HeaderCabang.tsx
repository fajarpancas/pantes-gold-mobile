import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import {scale} from '../services/Scale';

const HeaderCabang: React.FC = () => {
  return (
    <View style={styles.cabangPadding}>
      <Text size={16} family="bold">
        Cabang Sindang Laut
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
