import React from 'react';
import {View} from 'react-native';

type SpacerProps = {
  height?: number;
  width?: number;
};

const Spacer = (props: SpacerProps) => {
  const {height, width} = props;
  return <View style={{width, height}} />;
};

export default Spacer;
