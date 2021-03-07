import React from 'react'

export const AuthenticatedUserContext = React.createContext({
  username: undefined,
  password: undefined,
  isAuthenticated: () => {},
  authenticate: () => {},
  logout: () => {}
})
