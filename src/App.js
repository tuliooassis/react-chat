import './App.css'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Rooms } from './containers/Rooms'
import { OnlineUsers } from './containers/OnlineUsers'
import { UserManagement } from './containers/UserManagement'
import { Divider } from '@material-ui/core'
import { AuthenticatedUserProvider } from './providers/AuthenticatedUserProvider'
import { AuthRoute } from './routers/AuthRoute'

const App = () => {
  return (
    <div className="App">
      <AuthenticatedUserProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <AuthRoute isProtected path="/">
              <div className="App-content">
                <Rooms />
                <Divider />
                <OnlineUsers />
                <Divider />
                <UserManagement />
              </div>
            </AuthRoute>
          </Switch>
        </BrowserRouter>
      </AuthenticatedUserProvider>
    </div>
  )
}

export default App
