//import 'react-native-gesture-handler'; //docs say to import this or smth might crash.

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList } from 'react-native';
import Signin from './src/screens/auth/Signin';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export const UserContext = React.createContext({});

const App = () => {

  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      {user?.token ? (
        <>
          <SafeAreaView>
            <Text style={{padding: 40} }>Logged In</Text>
          </SafeAreaView>
        </>
      ) : (
        <>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash}/>
            <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
            <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
          </Stack.Navigator>
        </NavigationContainer>
        </>
      )}
    </UserContext.Provider>

  );
};

export default App;


// <ScrollView>
//         <Signup></Signup>
// </ScrollView>