import './App.css'
import React, { useState } from 'react'
import { Login } from './pages/Login/Login'
import { Rooms } from './containers/Rooms'
import { OnlineUsers } from './containers/OnlineUsers'
import { UserManagement } from './containers/UserManagement'
import { Divider } from '@material-ui/core'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

      </header>

      { isLoggedIn
        ? (
          <div className="App-content">
            <Rooms />
            <Divider />
            <OnlineUsers />
            <Divider />
            <UserManagement />
          </div>
          )
        : null }
    </div>
  )
}

export default App
