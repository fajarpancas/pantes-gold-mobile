import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const activeWidth = height > width ? width : height;
const activeHeight = height > width ? height : width;

const widthBaseScale = activeWidth / 360;
const heightBaseScale = activeHeight / 640;

function normalize(size: number, based: string = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function scale(layoutWidth: number) {
  return normalize(layoutWidth, 'width');
}
