import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import GlobalStyles from '../themes/GlobalStyles';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

const styles = StyleSheet.create({
  container: {
    height: scale(45),
    borderRadius: scale(10),
  },
  title: {
    color: Colors.white,
    fontSize: scale(15),
    fontWeight: '700',
  },
});

const Button = (props: ButtonProps) => {
  const {title, onPress, disabled} = props;
  const isDisable = disabled || false;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisable}
      style={[
        styles.container,
        GlobalStyles.center,
        {
          backgroundColor: isDisable
            ? Colors.disableButton
            : Colors.activeButton,
        },
      ]}>
      <Text style={styles.title}>{title || 'Title'}</Text>
    </Pressable>
  );
};

export default Button;
