import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import LoadingHelper from '../services/LoadingHelper';
import Colors from '../themes/Colors';
import GlobalStyles from '../themes/GlobalStyles';

class LoadingModal extends React.PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  componentDidMount(): void {
    LoadingHelper.setInstance(this);
  }

  show() {
    this.setState({visible: true});
  }

  hide() {
    this.setState({visible: false});
  }

  render(): React.ReactNode {
    const {visible} = this.state;
    return (
      <Modal
        visible={visible}
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent>
        <View
          style={[
            GlobalStyles.container,
            GlobalStyles.center,
            {backgroundColor: Colors.modalColor},
          ]}>
          <ActivityIndicator size={'large'} color={Colors.black} />
        </View>
      </Modal>
    );
  }
}

export default LoadingModal;
