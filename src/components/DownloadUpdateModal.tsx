import React from 'react';
import {Alert} from 'react-native';
import codePush, {DownloadProgress} from 'react-native-code-push';
import DownloadProgressInfo from './DownloadProgressInfo';

type State = {
  showProgress: boolean;
  downloadByte: number;
  totalByte: number;
};

class DownloadUpdateModal extends React.PureComponent<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showProgress: false,
      downloadByte: 0,
      totalByte: 1,
    };
  }

  codePushDownloadDidProgress(progress: DownloadProgress) {
    this.setState({
      downloadByte: progress.receivedBytes,
      totalByte: progress.totalBytes,
    });
  }

  codePushStatusDidChange(status: codePush.SyncStatus) {
    console.log('CODE PUSH STATUS', status);
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        this.setState({
          showProgress: false,
        });
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        this.setState({showProgress: true});
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        this.setState({
          showProgress: true,
        });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        this.setState({
          showProgress: false,
        });
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        setTimeout(
          () =>
            Alert.alert(
              'Download update complete',
              'To apply the update, you need to restart app. Restart now?',
              [
                {
                  text: 'Later',
                  onPress: () => {
                    this.setState({
                      showProgress: false,
                    });
                  },
                  style: 'cancel',
                },
                {
                  text: 'Ok',
                  onPress: () => {
                    this.setState({
                      showProgress: false,
                    });
                    codePush.restartApp();
                  },
                },
              ],
              {cancelable: false},
            ),
          1000,
        );

        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        const {showProgress} = this.state;
        this.setState(
          {
            showProgress: false,
          },
          () => {
            if (!__DEV__ && showProgress) {
              setTimeout(
                () =>
                  Alert.alert(
                    'Download Error',
                    'Download or Install update failure, please try again later.',
                  ),
                1000,
              );
            }
          },
        );
        break;
      default: {
        break;
      }
    }
  }

  render() {
    const {downloadByte, totalByte, showProgress} = this.state;

    const progress = (downloadByte / totalByte) * 100;
    if (showProgress) {
      return (
        <DownloadProgressInfo visible={showProgress} progress={progress} />
      );
    }
    return null;
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: true,
})(DownloadUpdateModal);
