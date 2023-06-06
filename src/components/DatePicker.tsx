import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Text from './Text';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import Colors from '../themes/Colors';
import {scale} from '../services/Scale';

type Props = {
  title: string;
  defaultValue?: Date;
  onSelectDate: (d: Date) => void;
};

const CustomDatePicker: React.FC<Props> = ({
  title,
  defaultValue,
  onSelectDate,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.greenlight,
          paddingVertical: scale(4),
          paddingHorizontal: scale(8),
          borderRadius: scale(8),
        }}
        onPress={() => setOpen(true)}>
        <Text>
          {defaultValue
            ? dayjs(defaultValue).format('DD/MM/YYYY')
            : 'Pilih tanggal'}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        mode="date"
        title={title}
        date={defaultValue ?? new Date()}
        onConfirm={date => {
          setOpen(false);
          onSelectDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CustomDatePicker;
