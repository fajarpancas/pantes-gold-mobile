import React from 'react';
import {Image, Modal, StyleSheet, View} from 'react-native';
import Text from './Text';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Images from '../themes/Images';
import Spacer from './Spacer';
import Button from './Button';

type Props = {
  visible: boolean;
  onPressOk: () => void;
  messageTitle: string;
  messageDesc: string;
  btnMessage?: string;
};

const SuccessModal: React.FC<Props> = props => {
  const {visible, onPressOk, messageTitle, messageDesc, btnMessage} = props;

  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalBackground} />
      <View style={styles.modalContainer}>
        <View style={styles.modalWrapper}>
          <Image source={Images.iconCheckCircle} style={styles.icCheck} />
          <Spacer height={16} />
          <Text size={16} family="bold" textAlign="center">
            {messageTitle}
          </Text>
          <Spacer height={16} />
          <Text
            size={14}
            color={Colors.fontSemiBlack}
            lineHeight={21}
            textAlign="center">
            {messageDesc}
          </Text>
          <Spacer height={24} />
          <View style={styles.width264}>
            <Button
              onPress={onPressOk}
              title={btnMessage || 'Kembali ke Home'}
              color={Colors.primary}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: scale(28),
    alignItems: 'center',
  },
  icCheck: {
    width: scale(40),
    height: scale(40),
  },
  width264: {
    width: scale(264),
  },
});

export default SuccessModal;
