import {StyleSheet} from 'react-native';
import {scale} from '../services/Scale';
import Colors from './Colors';

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: scale(1),
    borderColor: Colors.border,
    height: scale(45),
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
  },
});

export default GlobalStyles;
