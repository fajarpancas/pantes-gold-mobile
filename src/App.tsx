import React, {useEffect} from 'react';
import SplashScreen from './modules/SplashScreen';
import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './services/DropdownAlertHolder';
import RootNavigation from './navigation/RootNavigation';
import LoadingModal from './components/LoadingModal';
import DownloadUpdateModal from './components/DownloadUpdateModal';
import {sessionStore} from './stores/session/SessionStore';
import ApiServices from './services/ApiServices';
import {fcmService} from './services/FCMService';

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
    const token = sessionStore.getState().token;
    if (token) {
      ApiServices.setHeader('Authorization', `Bearer ${token}`);
    }

    FCMInit();
  }, []);

  const FCMInit = () => {
    // fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
  };

  const onRegister = (token: string) => {
    console.tron.log('[NotificationFCM] onRegister: ', token);
  };

  const onNotification = notify => {
    const options = {
      soundName: 'default',
      playSound: true,
    };
    console.tron.error({notify});
  };

  const onOpenNotification = notify => {
    // this.onGetLocation(notify)
    console.tron.log('[NotificationFCM] onOpenNotification: ', notify);
    console.log('[NotificationFCM] onOpenNotification: ', notify);
  };

  return (
    <React.Fragment>
      <RootNavigation />
      <LoadingModal />
      <DropdownAlert
        ref={ref => {
          DropdownAlertHolder.setInstance(ref);
        }}
      />
      <DownloadUpdateModal />
    </React.Fragment>
  );
};

export default App;
