import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {WARNA} from '../const/Data';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Text from './Text';

type Props = {
  value: string;
  error?: string;
  onSelect: (val: string) => void;
};

const ColorSelection: React.FC<Props> = ({onSelect, error, value}) => {
  return (
    <>
      <View style={styles.optionContainer}>
        {WARNA.map(w => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onSelect(w?.color)}
              style={[
                styles.optionWrapper2,
                value === w?.color ? {backgroundColor: w?.colorCode} : {},
              ]}>
              <Text
                textTransform="capitalize"
                family={value === w?.color ? 'bold' : 'regular'}
                size={14}
                color={value === w?.color ? Colors.white : Colors.fontBlack}>
                {w?.color}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error ? (
        <Text color={'red'} size={10}>
          {error}
        </Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
  },
  optionWrapper2: {
    borderWidth: 1,
    borderRadius: scale(8),
    borderColor: Colors.outlineBase,
    height: scale(45),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(20),
    marginRight: scale(10),
  },
  selectedColor: {
    backgroundColor: Colors.primary,
  },
});

export default ColorSelection;
