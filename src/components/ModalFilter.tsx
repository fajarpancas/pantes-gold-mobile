import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from './Text';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import LabelTextInput from './LabelTextInput';
import Fonts from '../themes/Fonts';
import Spacer from './Spacer';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import Button from './Button';

type Props = {
  visible: boolean;
  onSearch: () => void;
};

const ModalFilter: React.FC<Props> = props => {
  const {visible, onSearch} = props;
  const [date, setDate] = useState<Date | null>(null);
  const [dateVisible, setDateVisible] = useState(false);

  return (
    <>
      <Modal transparent visible={visible}>
        <View style={styles.modalBackground} />
        <View style={styles.modalContainer}>
          <View style={styles.modalWrapper}>
            <LabelTextInput label="Pilih tanggal" />
            <View style={styles.dateWrapper}>
              <Text>
                {date
                  ? dayjs(date).format('DD/MM/YYYY')
                  : 'Belum memilih tanggal'}
              </Text>
              <TouchableOpacity
                onPress={() => setDateVisible(true)}
                style={styles.changeWrapper}>
                <Text size={11} color={Colors.white} family="bold">
                  Pilih tanggal
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer height={10} />

            <LabelTextInput label="Kadar emas" />
            <Spacer height={5} />
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Masukkan kadar emas"
                placeholderTextColor={Colors.placeholder}
                keyboardType="number-pad"
                //   onChangeText={text => props.setFieldValue('kadar', text)}
              />
              <View style={styles.rightLabel}>
                <Text family="bold" color={Colors.primary}>
                  Karat
                </Text>
              </View>
            </View>

            <Spacer height={10} />

            <LabelTextInput label="Berat emas" />
            <Spacer height={5} />
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="Masukkan berat emas"
                placeholderTextColor={Colors.placeholder}
                keyboardType="number-pad"
                //   onChangeText={text => props.setFieldValue('kadar', text)}
              />
              <View style={styles.rightLabel}>
                <Text family="bold" color={Colors.primary}>
                  gram
                </Text>
              </View>
            </View>

            <Spacer height={20} />
            <Button onPress={onSearch} title="Cari" color={Colors.primary} />
            <Spacer height={10} />
            <Button
              onPress={() => {}}
              title="Reset Filter"
              color={Colors.white}
              border={'red'}
              titleColor="red"
            />
          </View>
        </View>
      </Modal>
      <Modal transparent visible={dateVisible}>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerWrapper}>
            <DatePicker
              date={date ?? new Date()}
              mode="date"
              onDateChange={setDate}
            />
            <Spacer height={10} />
            <Button
              onPress={() => {
                setDateVisible(false);
              }}
              title="Ok"
              color={Colors.primary}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: scale(360),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    paddingBottom: scale(40),
    paddingHorizontal: scale(20),
    paddingTop: scale(20),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  textInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: scale(261),
    borderWidth: 1,
    borderColor: Colors.outlineBase,
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
    height: scale(45),
    paddingLeft: scale(20),
    color: Colors.fontBlack,
    fontFamily: Fonts.type.regular,
  },
  rightLabel: {
    width: scale(59),
    borderTopColor: Colors.outlineBase,
    borderBottomColor: Colors.outlineBase,
    borderRightColor: Colors.outlineBase,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    height: scale(45),
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateWrapper: {
    height: scale(40),
    backgroundColor: Colors.white,
    elevation: 5,
    borderRadius: scale(8),
    marginVertical: scale(5),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: scale(20),
    paddingRight: scale(10),
    flexDirection: 'row',
  },
  changeWrapper: {
    backgroundColor: Colors.primary,
    paddingHorizontal: scale(8),
    paddingVertical: scale(6),
    borderRadius: scale(8),
  },
  datePickerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerWrapper: {
    backgroundColor: Colors.white,
    padding: scale(20),
    borderRadius: scale(20),
    elevation: 5,
  },
});

export default ModalFilter;
