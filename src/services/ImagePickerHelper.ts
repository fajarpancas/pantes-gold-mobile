import ImagePicker from 'react-native-image-crop-picker';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform, Alert, Linking} from 'react-native';

function openImagePicker2(
  options: any,
  successCallback: any,
  errorCallback: any,
) {
  check(
    Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    }) || PERMISSIONS.IOS.PHOTO_LIBRARY,
  )
    .then(result => {
      switch (result) {
        case RESULTS.LIMITED:
        case RESULTS.GRANTED: {
          openImagePickerComponent(options, successCallback, errorCallback);
          break;
        }
        case RESULTS.DENIED: {
          setTimeout(() => {
            request(
              Platform.select({
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
              }) || PERMISSIONS.IOS.PHOTO_LIBRARY,
            ).then(result2 => {
              switch (result2) {
                case RESULTS.LIMITED:
                case RESULTS.GRANTED: {
                  setTimeout(() => {
                    openImagePickerComponent(
                      options,
                      successCallback,
                      errorCallback,
                    );
                  }, 500);
                  break;
                }
                case RESULTS.DENIED:
                case RESULTS.BLOCKED: {
                  Alert.alert(
                    'Permission denied',
                    'you need to grant photo permission in the settings to continue',
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
            'you need to grant photo permission in the settings to continue',
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
    })
    .catch(error => {
      console.tron.error({error});
    });
}

export function openImagePicker(
  options: any,
  successCallback: any,
  errorCallback: any,
) {
  check(
    Platform.select({
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    }) || PERMISSIONS.IOS.PHOTO_LIBRARY,
  )
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          openImagePicker2(options, successCallback, errorCallback);
          break;
        case RESULTS.LIMITED:
        case RESULTS.GRANTED: {
          openImagePickerComponent(options, successCallback, errorCallback);
          break;
        }
        case RESULTS.DENIED: {
          setTimeout(() => {
            request(
              Platform.select({
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
                android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
              }) || PERMISSIONS.IOS.PHOTO_LIBRARY,
            ).then(result2 => {
              switch (result2) {
                case RESULTS.LIMITED:
                case RESULTS.GRANTED: {
                  setTimeout(() => {
                    openImagePickerComponent(
                      options,
                      successCallback,
                      errorCallback,
                    );
                  }, 500);
                  break;
                }
                case RESULTS.DENIED:
                case RESULTS.BLOCKED: {
                  Alert.alert(
                    'Permission denied',
                    'you need to grant photo permission in the settings to continue',
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
            'you need to grant photo permission in the settings to continue',
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
    })
    .catch(error => {
      console.tron.error({error});
    });
}

function openImagePickerComponent(
  options: any,
  successCallback: any,
  errorCallback: any,
) {
  ImagePicker.openPicker(options)
    .then((image: any) => {
      if (successCallback) {
        successCallback(image);
      }
    })
    .catch((error: any) => {
      if (errorCallback) {
        errorCallback(error);
      }
    });
}
