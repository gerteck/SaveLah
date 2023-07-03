import React, { useState, useEffect, useContext } from 'react';
import { colors } from './src/utils/colors';
import { Text, View, Image } from 'react-native';

//Global States
import { useAuthContext } from "./src/hooks/useAuthContext";

//For Routing and Navigation
import { DefaultTheme, NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signin from './src/screens/auth/Signin';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import TransactionHistory from './src/screens/app/TransactionHistory';
import AddTransaction from './src/screens/app/AddTransaction';
import Profile from './src/screens/app/Profile';
import Settings from './src/screens/app/Settings';
import EditTransaction from './src/screens/app/EditTransaction';
import AddCategory from './src/screens/app/AddCategory';

// Home Related
import Home from './src/screens/app/Home';
import SpendingReport from './src/screens/app/SpendingReport';

//Forum Related
import ForumHome from './src/screens/app/ForumHome';
import ForumAllChats from './src/screens/app/ForumAllChats';
import ForumChat from './src/screens/app/ForumChat';
import Notifications from './src/screens/app/Notifications';
import NewPost from './src/screens/app/NewPost';
// Note: ForumChat is not under a tab

//Register Profile Imports
import RegisterProfile from './src/screens/app/RegisterProfile';
import { getApp } from "firebase/app";
import { getFirestore, getDoc, doc, enableMultiTabIndexedDbPersistence, collection, onSnapshot } from 'firebase/firestore';
import { UserProfileContext } from './src/context/UserProfileContext';
import ProfileSearchUser from './src/screens/app/ProfileSearchUser';
import ProfileFollowInfo from './src/screens/app/ProfileFollowInfo';
import ProfileOtherUser from './src/screens/app/ProfileOtherUser';
import ForumPost from './src/screens/app/ForumPost';
import { NotificationNumberContext } from './src/context/NotificationNumberContext';


const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ForumStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack
const HomeTabs = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='HomeMain' component={Home} options={{ headerShown: false }} />
      <HomeStack.Screen name='SpendingReport' component={SpendingReport} options={{ headerShown: false }}/>
    </HomeStack.Navigator>
  )
}

//Forum Stack
const Forum = () => {
  return (
    <ForumStack.Navigator>
      <ForumStack.Screen name="ForumHome" component={ForumHome} options={{ headerShown: false }} />
      <ForumStack.Screen name="ForumAllChats" component={ForumAllChats} options={{ headerShown: false }} />
      <ForumStack.Screen name="NewPost" component={NewPost} options={{ headerShown: false }} />
    </ForumStack.Navigator>
  )
}

// Profile Settings Stack
const ProfileSettings = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <ProfileStack.Screen name="ProfileSearchUser" component={ProfileSearchUser} options={{ headerShown: false }} /> 
      <ProfileStack.Screen name="ProfileFollowInfo" component={ProfileFollowInfo} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  )
}

const Tabs = () => {
  const TabScreenOptions = ({ route }) => ({
    headerShown: false, 
    tabBarShowLabel: false, //set to false for aesthetics after finalizing
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
    <Tab.Navigator screenOptions={TabScreenOptions} backBehavior={"history"} >
      <Tab.Screen name="Home" component={HomeTabs} listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('HomeMain');
        }
      })}/>
      <Tab.Screen name="TransactionHistory" component={TransactionHistory}/>
      <Tab.Screen name="AddTransaction" component={AddTransaction} />
      <Tab.Screen name="Forum" component={Forum} />
      <Tab.Screen name="ProfileSettings" component={ProfileSettings} />
    </Tab.Navigator>
  )
};

const app = getApp;
const db = getFirestore(app);

const Routes = () => {

  const { user, authIsReady } = useAuthContext();
  const [ userProfile, setUserProfile ] = useContext(UserProfileContext);

  async function getSetUserProfile() {
      const userProfileRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userProfileRef);
      setUserProfile(docSnap.data());
      //console.log("Call for Profile in Routes: ");
  }

  // Get User Profile to determine if Registered
  useEffect(() => { user && getSetUserProfile() }, []);
  useEffect(() => { user && getSetUserProfile() }, [userProfile?.registered]);

  const [notificationNumber, setNotificationNumber] = useContext(NotificationNumberContext); 
  // Get notification count:

  const getNotificationCount = () => { 
    if (user?.uid) {
      const collectionRef = collection(db, 'notifications',  userProfile?.uid, 'notifications'); 
      const unSubNotifications = onSnapshot(collectionRef, (querySnapshot) => {
          let notificationCount = 0;
          querySnapshot.forEach((doc) => {
            //console.log(doc.data());
            if (doc.data()?.isRead == false ) {
              notificationCount += 1;
            }
          })
          setNotificationNumber(notificationCount); 
          console.log("notification refresh");
      })
    return unSubNotifications;
    }
    return () => () => {};
} 

useEffect(() => {
  console.log("Refresh notification listener")
    const unsub = getNotificationCount();
    return () => {
          unsub();
    };
}, [userProfile?.uid]);


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
                {user && userProfile?.registered && (
                      <>
                          <AuthStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                          <AuthStack.Screen name="ForumChat" component={ForumChat} options={{ headerShown: false }} />
                          <AuthStack.Screen name="ProfileOtherUser" component={ProfileOtherUser} options={{ headerShown: false }} /> 
                          <AuthStack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
                          <AuthStack.Screen name="ForumPost" component={ForumPost} options={{ headerShown: false }} />
                          <AuthStack.Screen name="EditTransaction" component={EditTransaction} options={{ headerShown: false }} />
                          <AuthStack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
                      </>
                )}
                {user && !userProfile?.registered && (
                    <>
                        <AuthStack.Screen name="RegisterProfile" component={RegisterProfile} options={{ headerShown: false }} />
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
  