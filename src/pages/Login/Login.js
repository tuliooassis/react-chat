import React, { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Button, Container, TextField } from '@material-ui/core'
import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUserContext'

export const Login = () => {
  const { authenticate } = useContext(AuthenticatedUserContext)
  const { control, handleSubmit } = useForm()
  const history = useHistory()

  const onSubmit = ({ username, password }) => {
    authenticate({ username, password })
    history.push('/')
  }

  return <Container maxWidth="sm">
    <form onSubmit={handleSubmit(onSubmit)} className="login">
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => <TextField label="Username" onChange={onChange} value={value} />}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => <TextField label="Password" type="password" onChange={onChange} value={value} />}
      />
      <Button variant="contained" type="submit">Login</Button>
    </form>
  </Container>
}
