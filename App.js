//import 'react-native-gesture-handler'; //docs say to import this or smth might crash.

import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList } from 'react-native';
import Signin from './src/screens/auth/Signin';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;


// <ScrollView>
//         <Signup></Signup>
// </ScrollView>