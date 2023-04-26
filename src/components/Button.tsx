import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import GlobalStyles from '../themes/GlobalStyles';
import Text from './Text';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  border?: string;
  titleColor?: string;
};

const styles = StyleSheet.create({
  container: {
    height: scale(45),
    borderRadius: scale(10),
  },
});

const Button = (props: ButtonProps) => {
  const {title, onPress, disabled, color, border, titleColor} = props;
  const isDisable = disabled || false;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isDisable}
      style={[
        styles.container,
        GlobalStyles.center,
        {
          backgroundColor: isDisable
            ? Colors.disableButton
            : color
            ? color
            : Colors.activeButton,
          borderColor: border,
          borderWidth: border ? 1 : 0,
        },
      ]}>
      <Text size={15} family="semiBold" color={titleColor || Colors.white}>
        {title || 'Title'}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
