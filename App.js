import React, {useState} from 'react';
import { AuthContextProvider } from './src/context/AuthContext';
import Routes from './Routes';
import { UserProfileContext } from './src/context/UserProfileContext';

const App = () => {
  const [userProfile, setUserProfile] = useState({});
  return (
      <AuthContextProvider>
        <UserProfileContext.Provider value={[userProfile, setUserProfile]}>
          <Routes />
        </UserProfileContext.Provider>
      </AuthContextProvider>
  );
};

export default App;
