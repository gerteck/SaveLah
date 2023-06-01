//import 'react-native-gesture-handler'; //docs say to import this or smth might crash.

import React, { useContext, useEffect, useState } from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import Routes from './Routes';

import { NativeBaseProvider, Box } from "native-base";

const App = () => {
  return (
        <AuthContextProvider>
            <Routes />
        </AuthContextProvider>
  );
};

export default App;
