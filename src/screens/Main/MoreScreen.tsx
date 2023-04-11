import React from 'react';
import {View} from 'react-native';
import Button from '../../components/Button';
import {sessionStore} from '../../stores/session/SessionStore';
import GlobalStyles from '../../themes/GlobalStyles';

class MoreScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onPressLogout = this.onPressLogout.bind(this);
  }

  onPressLogout() {
    sessionStore.getState().setLogin(false);
  }

  render(): React.ReactNode {
    return (
      <View style={[GlobalStyles.container, GlobalStyles.center]}>
        <Button title="Log Out" onPress={this.onPressLogout} />
      </View>
    );
  }
}

export default MoreScreen;
