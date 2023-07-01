import React, {useState} from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import Routes from './Routes';
import { UserProfileContext } from './src/context/UserProfileContext';
import { NotificationNumberContext } from './src/context/NotificationNumberContext';

const App = () => {
  const [userProfile, setUserProfile] = useState({});
  const [notificationNumber, setNotificationNumber] = useState(0);

  return (
      <AuthContextProvider>
        <UserProfileContext.Provider value={[userProfile, setUserProfile]}>
        <NotificationNumberContext.Provider value={[notificationNumber, setNotificationNumber]}>

          <Routes />
        
        </NotificationNumberContext.Provider>
        </UserProfileContext.Provider>
      </AuthContextProvider>
  );
};

export default App;
