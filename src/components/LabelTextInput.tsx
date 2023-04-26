import React from 'react';
import Text from './Text';
import Colors from '../themes/Colors';

type props = {
  label: string;
  color?: string;
  size?: number;
};

const LabelTextInput: React.FC<props> = ({label, color, size}) => {
  return (
    <Text family="semiBold" color={color ?? Colors.fontBlack} size={size ?? 14}>
      {label}
    </Text>
  );
};

export default LabelTextInput;
