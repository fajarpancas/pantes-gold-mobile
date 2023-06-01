import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Images from '../../../themes/Images';
import {scale} from '../../../services/Scale';

type Props = {
  onPress: () => void;
};

const FloatingAdd: React.FC<Props> = props => {
  const {onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{position: 'absolute', bottom: scale(25), right: scale(25)}}>
      <Image
        source={Images.iconAdd}
        style={{height: scale(45), width: scale(45), resizeMode: 'contain'}}
      />
    </TouchableOpacity>
  );
};

export default FloatingAdd;
