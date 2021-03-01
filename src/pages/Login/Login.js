import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { create, logout } from '../../infra/xmpp/stanza-client/stanza-client';

export const Login = ({isLoggedIn, setIsLoggedIn}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    await create(username, password)
    setIsLoggedIn(true)
  }

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'))

    if(loggedUser){
      setUsername(loggedUser.username)
      setPassword(loggedUser.password)
      login()
    }
  }, [])

  const onLogin = () => {
    localStorage.setItem('user', JSON.stringify({ username, password }))
    login()
  }

  const LoginFields = () => {
    return <>
      <TextField id="username" label="Username" value={username} onChange={(event)=> {setUsername(event.target.value)}}/>
      <TextField id="password" label="Password" value={password} onChange={(event)=> {setPassword(event.target.value)}}/>
      <Button variant="contained" onClick={onLogin}>Log in</Button> 
    </>
  }

  const onLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    logout()
  }

  const LoggedFields = () => {
    return <>
      You are {username}.
      <Button variant="contained" onClick={onLogout}>Logout</Button> 
    </>
  }

  return isLoggedIn ? <LoggedFields/> : <LoginFields />
}