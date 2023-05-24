import React, { useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import Signin from './src/screens/auth/Signin';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';


// <Text>Hello World</Text>

const App = () => {
  return (
    <View>
      <Signin/>
      
    </View>
  );
};

export default App;