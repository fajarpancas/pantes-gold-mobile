import React from 'react';
import {StyleSheet, Text as TextNative, TextStyle} from 'react-native';
import {scale} from '../services/Scale';
import Fonts from '../themes/Fonts';
import Colors from '../themes/Colors';

const getFontFamily = (family?: string) => {
  switch (family) {
    case 'bold':
      return styles.fontBold;
    case 'medium':
      return styles.fontMedium;
    case 'semiBold':
      return styles.fontSemiBold;
    default:
      return styles.fontRegular;
  }
};

type TextDecorationProps =
  | 'none'
  | 'underline'
  | 'line-through'
  | 'underline line-through';

type TextProps = {
  children: any;
  style?: TextStyle;
  color?: string;
  family?: 'regular' | 'medium' | 'semiBold' | 'bold';
  size?: number;
  decoration?: TextDecorationProps;
  numberOfLines?: number;
  lineHeight?: number;
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify' | undefined;
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
};

type Props = TextNative['props'] & TextProps;

const Text: React.FC<Props> = props => {
  const {
    children,
    style,
    color,
    family,
    size,
    decoration,
    numberOfLines,
    lineHeight,
    textAlign,
    textTransform,
    ...rest
  } = props;
  const font = getFontFamily(family);

  return (
    <TextNative
      numberOfLines={numberOfLines}
      {...rest}
      style={[
        font,
        {
          textAlign,
          color,
          fontSize: size && scale(size),
          textDecorationLine: decoration,
          lineHeight: lineHeight && scale(lineHeight),
          textTransform: textTransform,
        },
        style,
      ]}>
      {children}
    </TextNative>
  );
};

Text.defaultProps = {
  textAlign: 'left',
  family: 'regular',
  color: Colors.fontBlack,
  children: '',
  size: 12,
  testID: 'text',
  decoration: 'none',
};

const styles = StyleSheet.create({
  fontBold: {
    fontFamily: Fonts.type.bold,
  },
  fontMedium: {
    fontFamily: Fonts.type.medium,
  },
  fontSemiBold: {
    fontFamily: Fonts.type.semibold,
  },
  fontRegular: {
    fontFamily: Fonts.type.regular,
  },
});

export default React.memo<Props>(Text);
