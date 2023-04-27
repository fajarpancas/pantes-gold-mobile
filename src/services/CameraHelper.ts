import ImagePicker from 'react-native-image-crop-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform, Alert, Linking} from 'react-native';

export function openCamera(
  options: any,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) {
  check(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  ).then((result: any) => {
    switch (result) {
      case RESULTS.GRANTED: {
        openCameraComponent(options, successCallback, errorCallback);
        break;
      }
      case RESULTS.DENIED: {
        setTimeout(() => {
          request(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.CAMERA
              : PERMISSIONS.ANDROID.CAMERA,
          ).then((result2: any) => {
            switch (result2) {
              case RESULTS.GRANTED: {
                setTimeout(() => {
                  openCameraComponent(options, successCallback, errorCallback);
                }, 500);
                break;
              }
              case RESULTS.DENIED:
              case RESULTS.BLOCKED: {
                Alert.alert(
                  'Permission denied',
                  'you need to grant camera permission in the settings to continue',
                  [
                    {
                      onPress: async () => {
                        await Linking.openSettings();
                      },
                      text: 'Ok',
                      style: 'default',
                    },
                  ],
                );
                break;
              }
              default: {
                break;
              }
            }
          });
        }, 300);
        break;
      }
      case RESULTS.BLOCKED: {
        Alert.alert(
          'Permission denied',
          'you need to grant camera permission in the settings to continue',
          [
            {
              onPress: async () => {
                await Linking.openSettings();
              },
              text: 'Ok',
              style: 'default',
            },
          ],
        );
        break;
      }
      default: {
        break;
      }
    }
  });
}

function openCameraComponent(
  options: any,
  successCallback: (response: any) => void,
  errorCallback: (error: any) => void,
) {
  ImagePicker.openCamera(options)
    .then(image => {
      if (successCallback) {
        successCallback(image);
      }
    })
    .catch(error => {
      if (errorCallback) {
        errorCallback(error);
      }
    });
}
