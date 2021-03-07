import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext'

export const LogoutButton = () => {
  const { logout } = useContext(AuthenticatedUserContext)

  return <Button variant="contained" onClick={logout}>Logout</Button>
}
