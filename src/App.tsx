import React, {useEffect} from 'react';
import SplashScreen from './modules/SplashScreen';
import DropdownAlert from 'react-native-dropdownalert';
import DropdownAlertHolder from './services/DropdownAlertHolder';
import RootNavigation from './navigation/RootNavigation';
import LoadingModal from './components/LoadingModal';
import DownloadUpdateModal from './components/DownloadUpdateModal';
import {sessionStore} from './stores/session/SessionStore';
import ApiServices from './services/ApiServices';

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
    const token = sessionStore.getState().token;
    if (token) {
      ApiServices.setHeader('Authorization', `Bearer ${token}`);
    }
  }, []);

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
