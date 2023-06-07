//import 'react-native-gesture-handler'; //docs say to import this or smth might crash.
import React, { useContext } from 'react';
import { colors } from './src/utils/colors';
import { Text, View, Image } from 'react-native';

//Global States
// import { UserContext } from './AppContext'; Now using a different context
import { useAuthContext } from "./src/hooks/useAuthContext";

//For Routing and Navigation
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signin from './src/screens/auth/Signin';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import Home from './src/screens/app/Home';
import TransactionHistory from './src/screens/app/TransactionHistory';
import AddTransaction from './src/screens/app/AddTransaction';
import Profile from './src/screens/app/Profile';
import Settings from './src/screens/app/Settings';

import { SafeAreaView } from 'react-native-safe-area-context';

//Forum Related
import ForumHome from './src/screens/app/ForumHome';
import ForumAllChats from './src/screens/app/ForumAllChats';
import ForumChat from './src/screens/app/ForumChat';
import Notifications from './src/screens/app/Notifications';

// Note: ForumChat is not under a tab


const AuthStack = createStackNavigator();
const ForumStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Forum Stack
const Forum = () => {
  return (
    <ForumStack.Navigator>
      <ForumStack.Screen name="ForumHome" component={ForumHome} options={{ headerShown: false }} />
      <ForumStack.Screen name="ForumAllChats" component={ForumAllChats} options={{ headerShown: false }} />
    </ForumStack.Navigator>
  )
}

// Profile Settings Stack
const ProfileSettings = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  )
}

const Tabs = () => {
  const TabScreenOptions = ({ route }) => ({
    headerShown: false, 
    tabBarShowLabel: true, //set to false for aesthetics after finalizing
    tabBarHideOnKeyboard: true,
    
    tabBarIcon: ({ focused, color, size}) => {
      let icon;

        if (route.name === 'Home') {
          icon = focused //if it is active
            ? require('./src/assets/tabBar/home_active.png')
            : require('./src/assets/tabBar/home.png')
        } else if (route.name === 'TransactionHistory') {
          icon = focused //if it is active
            ? require('./src/assets/tabBar/wallet_active.png')
            : require('./src/assets/tabBar/wallet.png')
        } else if (route.name === 'Forum') {
          icon = focused //if it is active
            ? require('./src/assets/tabBar/forum_active.png')
            : require('./src/assets/tabBar/forum.png')
        } else if (route.name === 'ProfileSettings') {
          icon = focused //if it is active
            ? require('./src/assets/tabBar/profile_active.png')
            : require('./src/assets/tabBar/profile.png')
        } else if (route.name === 'AddTransaction') {
          return <Image source={require('./src/assets/tabBar/addButton.png')}
                        style={{width: 32, height: 32,}} />;
        }
        // You can return any component that you like here!
        return <Image style={{width: 24, height:24}} source={icon}/>
      }
  });

  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="TransactionHistory" component={TransactionHistory} />
      <Tab.Screen name="AddTransaction" component={AddTransaction} />
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen name="ProfileSettings" component={ProfileSettings} />
    </Tab.Navigator>
  )
};


const Routes = () => {

  const { user, authIsReady } = useAuthContext();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.backgroundGrey,  
    
    },
  }

  return (
    <NavigationContainer theme={MyTheme}>
        {authIsReady && (
            <AuthStack.Navigator>
                {user && (
                    <>
                        <AuthStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                        <AuthStack.Screen name="ForumChat" component={ForumChat} options={{ headerShown: false }} />
                        <AuthStack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
                    </>
                )}
                {!user && (
                    <>
                        <AuthStack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                        <AuthStack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                        <AuthStack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                    </>
                )}
            </AuthStack.Navigator>
        )}
    </NavigationContainer>
);
};
  
export default React.memo(Routes);
  