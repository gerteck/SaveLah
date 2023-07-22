import React, {useState, useEffect} from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import Routes from './Routes';
import { UserProfileContext } from './src/context/UserProfileContext';
import { NotificationNumberContext } from './src/context/NotificationNumberContext';
import { ThemeContext } from './src/context/ThemeContext';
import { Appearance } from "react-native";
import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// To wait for font to load.
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [userProfile, setUserProfile] = useState({});
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });

  useEffect(() => {
    //updateTheme called via Appearance.addChangeListener method upon theme change
    Appearance.addChangeListener(({ colorScheme }) => {
      setTheme({ mode: colorScheme });
    });
  }, []);

  // Load Fonts CHANGE FONT HERE
  const [fontsLoaded] = useFonts({
    'customFont': require('./src/assets/fonts/Inter-Bold.otf'),
  }); 

  // console.log('current theme:', theme.mode);
  // console.log(fontsLoaded);

  // Display Splash Screen till fonts are loaded, then hide splash
  useEffect(() => {
    const hide = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }}
    hide();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

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
