import React, { useState } from 'react';
import Routes from './Routes';
export const UserContext = React.createContext({});

const App = () => {

  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes/>
    </UserContext.Provider>

  );
};

export default App;

