import React, {useState, useEffect} from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import Routes from './Routes';
import { UserProfileContext } from './src/context/UserProfileContext';
import { NotificationNumberContext } from './src/context/NotificationNumberContext';
import { ThemeContext } from './src/context/ThemeContext';
import { Appearance } from "react-native";

const App = () => {
  const [userProfile, setUserProfile] = useState({});
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });

  useEffect(() => {
    //if the theme of the device changes then
    //updateTheme function will be called using
    //Appearance.addChangeListener method
    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme({ mode: colorScheme });
    });
  }, []);

  console.log('current theme:', theme.mode);

  return (
      <AuthContextProvider>
        <UserProfileContext.Provider value={[userProfile, setUserProfile]}>
        <NotificationNumberContext.Provider value={[notificationNumber, setNotificationNumber]}>
        <ThemeContext.Provider value={{ theme }}>

          <Routes />

        </ThemeContext.Provider>
        </NotificationNumberContext.Provider>
        </UserProfileContext.Provider>
      </AuthContextProvider>
  );
};

export default App;
