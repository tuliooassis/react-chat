import './App.css';
import React, { useState } from 'react';
import { Login } from './pages/Login/Login';
import { Rooms } from './containers/Rooms';
import { OnlineUsers } from './containers/OnlineUsers';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        { isLoggedIn ? (
          <>
            <Rooms />
            <OnlineUsers />
          </>
        ): null }
      </header>
    </div>
  );
}

export default App;
