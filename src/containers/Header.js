import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext'
import { LogoutButton } from '../components/LogoutButton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

export const Header = ({ children }) => {
  const classes = useStyles()
  const { isAuthenticated } = useContext(AuthenticatedUserContext)

  return <div className={classes.root}>
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          XMPP Chat with React
        </Typography>
        { isAuthenticated && <LogoutButton /> }
      </Toolbar>
    </AppBar>
    { children }
  </div>
}

Header.propTypes = {
  children: PropTypes.any
}
