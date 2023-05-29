import React, { useState } from 'react';
import Routes from './Routes';
import { UserContext } from './AppContext';

const App = () => {

  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Routes/>
    </UserContext.Provider>

  );
};

export default App;

