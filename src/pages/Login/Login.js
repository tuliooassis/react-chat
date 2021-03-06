import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core'
import { create, logout } from '../../infra/xmpp/stanza-client/stanza-client'

export const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    await create(username, password)
    setIsLoggedIn(true)
  }

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'))

    if (loggedUser) {
      setUsername(loggedUser.username)
      setPassword(loggedUser.password)
      login()
    }
  // eslint-disable-next-line
  }, [])

  const onLogin = () => {
    localStorage.setItem('user', JSON.stringify({ username, password }))
    login()
  }

  const onLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    logout()
  }

  return isLoggedIn
    ? (
    <>
      You are {username}.
      <Button variant="contained" onClick={onLogout}>Logout</Button>
    </>
      )
    : (
    <>
      <TextField id="username" label="Username" value={username} onChange={(event) => { setUsername(event.target.value) }}/>
      <TextField id="password" label="Password" type="password" value={password} onChange={(event) => { setPassword(event.target.value) }}/>
      <Button variant="contained" onClick={onLogin}>Log in</Button>
    </>
      )
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired
}
