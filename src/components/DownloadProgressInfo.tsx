import React, {useEffect, useMemo, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Easing,
} from 'react-native';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {scale} from '../services/Scale';
import Colors from '../themes/Colors';
import Images from '../themes/Images';

type Props = {
  visible: boolean;
  progress: number;
};

const DownloadProgressInfo: React.FC<Props> = props => {
  const {visible, progress} = props;

  const deviceWidth: number = Dimensions.get('window').width;
  const deviceHeight: number = Dimensions.get('window').height;

  const floatingWidth: number = scale(80);
  const floatingHeight: number = scale(45);
  const currentPosition = useRef<any>();

  const position = useRef<any>(
    new Animated.ValueXY({
      x: deviceWidth - floatingWidth,
      y: deviceHeight - floatingHeight - scale(120),
    }),
  );
  const _scale = useRef(new Animated.Value(visible ? 1 : 0));

  useEffect(() => {
    Animated.timing(_scale.current, {
      toValue: visible ? 1 : 0,
      duration: visible ? 900 : 50,
      useNativeDriver: false,
      easing: Easing.exp,
    }).start();
  }, [visible]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          currentPosition.current = JSON.parse(
            JSON.stringify(position.current),
          );
          const offsetY =
            position.current.y._offset + position.current.y._value;

          position.current.setOffset({
            x: deviceWidth - floatingWidth,
            y: offsetY,
          });
          position.current.setValue({
            x: 0,
            y: 0,
          });
        },
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: position.current.x,
              dy: position.current.y,
            },
          ],
          {useNativeDriver: false},
        ),
        onPanResponderRelease: () => {
          const header = scale(150);
          const footer = scale(10);
          const maxHeight = deviceHeight - header - footer;

          const _currentOffset = position.current.y._offset;
          let verticalValue = position.current.y._value;
          let offsetY = verticalValue + _currentOffset;

          // measure current position if overflows
          if (verticalValue < 0) {
            if (Math.abs(verticalValue) > _currentOffset) {
              verticalValue = 8 - _currentOffset;
            }
          }
          verticalValue =
            offsetY > maxHeight ? maxHeight - _currentOffset : verticalValue;

          Animated.spring(position.current, {
            toValue: {
              x: 0,
              y: verticalValue,
            },
            useNativeDriver: false,
          }).start();
        },
      }),
    [],
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        position.current.getLayout(),
        styles.container,
        {
          transform: [
            {
              scale: _scale.current,
            },
          ],
        },
      ]}>
      <CircularProgressBase
        value={progress}
        radius={scale(30)}
        circleBackgroundColor={Colors.white}
        inActiveStrokeWidth={7}
        activeStrokeWidth={7}
        inActiveStrokeColor={Colors.border}
        activeStrokeColor={Colors.activeButton}
        children={
          <Image
            source={Images.iconDownload}
            style={
              progress > 0 ? styles.iconDownloadInProgress : styles.iconDownload
            }
          />
        }
      />
    </Animated.View>
  );
};

export default DownloadProgressInfo;

const styles = StyleSheet.create({
  container: {
    width: scale(72),
    height: scale(72),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99,
  },
  iconDownload: {
    width: scale(26),
    height: scale(26),
    resizeMode: 'contain',
    tintColor: Colors.border,
  },
  iconDownloadInProgress: {
    width: scale(26),
    height: scale(26),
    resizeMode: 'contain',
    tintColor: Colors.activeButton,
  },
});
