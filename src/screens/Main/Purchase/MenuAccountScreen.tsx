import React from 'react';
import {View} from 'react-native';
import {scale} from '../../../services/Scale';
import {connect} from '../../../services/ZustandHelper';
import Button from '../../../components/Button';
import useUserStore from '../../../stores/user/UserStore';
import UserModel from '../../../models/UserModel';
import {sessionStore} from '../../../stores/session/SessionStore';
import Text from '../../../components/Text';
import {getReadableVersion} from 'react-native-device-info';
import Spacer from '../../../components/Spacer';

class MenuAccountScreen extends React.PureComponent {
  render(): React.ReactNode {
    try {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: scale(200)}}>
            <Button
              color="red"
              title="Logout"
              onPress={() => sessionStore.getState().setLogin(false)}
            />
          </View>
          <Spacer height={10} />
          <Text>Versi Aplikasi {getReadableVersion()}</Text>
        </View>
      );
    } catch {
      return <View />;
    }
  }
}

const userSelector = (state: UserModel) => ({
  user: state.user,
});

const stores = [{store: useUserStore, selector: userSelector}];

export default connect(stores)(MenuAccountScreen);
