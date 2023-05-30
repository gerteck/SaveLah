//import 'react-native-gesture-handler'; //docs say to import this or smth might crash.

import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList } from 'react-native';
import Signin from './src/screens/auth/Signin';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContextProvider, AuthContext } from './src/context/AuthContext';
import { useAuthContext } from './src/hooks/useAuthContext';
import Routes from './Routes';

const Stack = createStackNavigator();
// export const UserContext = React.createContext({});

const App = () => {

  return (
    <AuthContextProvider>
        <Routes />
    </AuthContextProvider>

  );
};

export default App;


// <ScrollView>
//         <Signup></Signup>
// </ScrollView>