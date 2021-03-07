import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext'

export const AuthRoute = (props) => {
  const { isProtected } = props

  if (isProtected && !isAuthenticated()) return <Redirect to="/login" />
  return <Route {...props} />
}

const isAuthenticated = () => {
  const authenticatedUser = useContext(AuthenticatedUserContext)
  const { username } = authenticatedUser

  return !!username
}

AuthRoute.propTypes = {
  isProtected: PropTypes.bool
}
