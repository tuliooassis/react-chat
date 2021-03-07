import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext'
import { create } from '../infra/xmpp/stanza-client/stanza-client'

const LOCAL_STORAGE_USER_KEY = 'authenticatedUser'
const authenticatedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY))
const initialState = { username: authenticatedUser?.username, password: authenticatedUser?.password }

export const AuthenticatedUserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(initialState)

  const authenticate = async ({ username, password }) => {
    setAuthenticatedUser({ username, password })
  }

  useEffect(() => {
    const { username, password } = authenticatedUser

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify({ username, password }))
    create(username, password)
  }, [authenticatedUser])

  const authenticatedUserContextValue = {
    ...authenticatedUser,
    authenticate
  }

  return <AuthenticatedUserContext.Provider value={authenticatedUserContextValue}>
    { children }
  </AuthenticatedUserContext.Provider>
}

AuthenticatedUserProvider.propTypes = {
  children: PropTypes.any,
  history: PropTypes.any
}
