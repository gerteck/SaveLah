//import 'react-native-gesture-handler'; //docs say to import this or smth might crash.
import React, { useContext } from 'react';
import { colors } from './src/utils/colors';

//Global States
import { UserContext } from './AppContext';

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
import ForumHome from './src/screens/app/ForumHome';
import Profile from './src/screens/app/Profile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="TransactionHistory" component={TransactionHistory} />
      <Tab.Screen name="AddTransaction" component={AddTransaction} />
      <Tab.Screen name="ForumHome" component={ForumHome} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
};


const Routes = () => {

  const {user} = useContext(UserContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: colors.white,  
    
    },
  }

  return (
    <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          {user?.token ? (
            <>
              <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
            </>
          ) : (
            <>
              <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
              <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
              <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}}/>
            </>
          )}  


      </Stack.Navigator>
    </NavigationContainer>
      
  );
};
  
export default React.memo(Routes);
  