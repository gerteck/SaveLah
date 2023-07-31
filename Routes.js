import React, { useState, useEffect, useContext } from 'react';
import { colors } from './src/utils/colors';
import { Text, Image } from 'react-native';

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


// Theme Color Related
import themeColors from './src/utils/themeColors';
import { ThemeContext } from './src/context/ThemeContext';
import { Icon } from '@rneui/themed';
import LoadingScreen from './src/screens/app/LoadingScreen';
import FadeInView from './src/components/FadeInView';
import ForgetPassword from './src/screens/auth/ForgetPassword';

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
    </HomeStack.Navigator>
  )
}

const FadeHomeTabs = (props, { navigation }) => (
  <FadeInView>
    <HomeStack.Navigator {...props}>
      <HomeStack.Screen name='HomeMain' component={Home} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  </FadeInView>
);

const FadeTransactionHistory = (props, { navigation }) => (
  <FadeInView>
    <TransactionHistory {...props}/>
  </FadeInView>
);

const FadeAddTransaction = (props, { navigation }) => (
  <FadeInView>
    <AddTransaction {...props}/>
  </FadeInView>
);

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

const FadeForum = (props, { navigation }) => (
  <FadeInView> 
    <ForumStack.Navigator {...props}>
      <ForumStack.Screen name="ForumHome" component={ForumHome} options={{ headerShown: false }} />
      <ForumStack.Screen name="ForumAllChats" component={ForumAllChats} options={{ headerShown: false }} />
      <ForumStack.Screen name="NewPost" component={NewPost} options={{ headerShown: false }} />
    </ForumStack.Navigator>
  </FadeInView>
);

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

const FadeProfileSettings = (props, { navigation }) => (
  <FadeInView> 
    <ProfileStack.Navigator {...props}>
      <ProfileStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <ProfileStack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <ProfileStack.Screen name="ProfileSearchUser" component={ProfileSearchUser} options={{ headerShown: false }} /> 
      <ProfileStack.Screen name="ProfileFollowInfo" component={ProfileFollowInfo} options={{ headerShown: false }} />
    </ProfileStack.Navigator>
  </FadeInView>
);

// Bottom Tab Navigator
const Tabs = () => {
  const { theme }  = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];

  const TabScreenOptions = ({ route }) => ({
    headerShown: false, 
    tabBarShowLabel: true, //set to false for aesthetics after finalizing
    tabBarHideOnKeyboard: true,   
    tabBarStyle: {
      backgroundColor: activeColors.inputBackground,
      height: 60,
    },

    // To add Text Label of Tab 
    tabBarLabel: ({ focused }) => {
      let label;
      if (route.name === 'Home') {
        label = "Home";
      } else if (route.name === 'TransactionHistory') {
        label = "History";
      } else if (route.name === 'Forum') {
        label = "Forum";
      } else if (route.name === 'ProfileSettings') {
        label = "Profile";
      } else if (route.name === 'AddTransaction') {
        label = "";
        // return <Text></Text>
      }
      return <Text style={{fontSize: 12, fontWeight: '400', color: activeColors.text, marginBottom: 4, marginTop: -8, fontFamily: "customFont"}}>{focused ? label : ""}</Text>
    },

    tabBarLabelStyle: {zIndex: -1},
    tabBarIcon: ({ focused, color, size}) => {
      let iconColor = focused
      ? activeColors.blue
      : activeColors.iconColor
      let name;

      if (route.name === 'Home') {
        name = "home";
         //if it is active
      } else if (route.name === 'TransactionHistory') {
        name = "wallet";
      } else if (route.name === 'Forum') {
        name = "users";
      } else if (route.name === 'ProfileSettings') {
        name = "user-alt";
      } else if (route.name === 'AddTransaction') {
        name = "plus-circle";
        iconColor = activeColors.green;
        return <Icon name="plus-circle" size={34} type='font-awesome-5' color={activeColors.green}/> 
      }
      return <Icon name={name} style={{}} size={24} type='font-awesome-5' color={iconColor}/>    
    }
    
  });

  return (
    <Tab.Navigator screenOptions={TabScreenOptions} backBehavior={"history"} >
      <Tab.Screen name="Home" component={FadeHomeTabs} listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('Home', {screen: 'HomeMain'});
        }
      })}/>
      <Tab.Screen name="TransactionHistory" component={FadeTransactionHistory}/>
      <Tab.Screen name="AddTransaction" component={FadeAddTransaction} />
      <Tab.Screen name="Forum" component={FadeForum} />
      <Tab.Screen name="ProfileSettings" component={FadeProfileSettings} />
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
  }
  
  // console.log(userProfile);

  // Get User Profile to determine if Registered
  useEffect(() => { user && getSetUserProfile() }, []);
  useEffect(() => { user && getSetUserProfile() }, [userProfile?.registered]);

  const [notificationNumber, setNotificationNumber] = useContext(NotificationNumberContext); 

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
          //console.log("notification refresh");
      })
    return unSubNotifications;
    }
    return () => () => {};
  } 

  useEffect(() => {
    //console.log("Refresh notification listener")
    const unsub = getNotificationCount();
    return () => {
          unsub();
    };
  }, [userProfile?.uid]);

  const { theme }  = useContext(ThemeContext);
  let activeColors = themeColors[theme.mode];
  const isDark = theme.mode == 'dark';
  
  const MyTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
        ...DefaultTheme.colors,
        text: activeColors.text,
        background: activeColors.appBackground,  
    },
  }

  return (
    <NavigationContainer theme={MyTheme}>
        {authIsReady && (
            <AuthStack.Navigator>
                {user && userProfile?.registered == true && (
                      <>
                          <AuthStack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                          <AuthStack.Screen name="ForumChat" component={ForumChat} options={{ headerShown: false }} />
                          <AuthStack.Screen name="ProfileOtherUser" component={ProfileOtherUser} options={{ headerShown: false }} /> 
                          <AuthStack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
                          <AuthStack.Screen name="ForumPost" component={ForumPost} options={{ headerShown: false }} />
                          <AuthStack.Screen name="EditTransaction" component={EditTransaction} options={{ headerShown: false }} />
                          <AuthStack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
                          <AuthStack.Screen name="SpendingReport" component={SpendingReport} options={{ headerShown: false }} />
                      </>
                )}
                {user && Object.keys(userProfile).length == 0 && ( 
                    <>
                        <AuthStack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
                    </>
                )}
                {user && userProfile?.registered == false && (
                    <>
                        <AuthStack.Screen name="RegisterProfile" component={RegisterProfile} options={{ headerShown: false }} />
                    </>
                )}
                {!user && (
                    <>
                        <AuthStack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                        <AuthStack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
                        <AuthStack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                        <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
                    </>
                )}
            </AuthStack.Navigator>
        )}
    </NavigationContainer>
  );
};
  
export default React.memo(Routes);
  