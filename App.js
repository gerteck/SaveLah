//import 'react-native-gesture-handler'; //docs say to import this or smth might crash.

import React from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import Routes from './Routes';


const App = () => {
  return (
      <AuthContextProvider>
          <Routes />
      </AuthContextProvider>
  );
};

export default App;
