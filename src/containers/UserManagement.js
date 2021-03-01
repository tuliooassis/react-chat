import React, { useState } from 'react';
import Faker from 'faker';
import { getAllUsers, register, getPresence } from '../infra/ejabberd-client/user-client';
import { deleteAccount } from '../infra/xmpp/stanza-client/stanza-client';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';

export const UserManagement = () => {
  const [users, setUsers] = useState([])

  const get = async () => {
    const users = await getAllUsers()
    setUsers(users)
  }

  const onCreateUser = async () => {
    const user = Faker.name.firstName()
    const defaultPassword = '123456'
    await register({ user, password: defaultPassword })
    get()
  }
  
  const onDeleteUser = async (name) => {
    const userData = await getPresence(name)
    const deleteres = await deleteAccount(userData.jid)
    console.log(deleteres)
    get()
  }
  
  const actions = [
    { onClick: onDeleteUser, name: 'Delete'}
  ]

  return <div className="App-container">
    <List subheader={'User Management'}>
      { users.map((item, index) => {
        return <ListItem key={index}>
          <ListItemText secondary={item}/>
          { actions.map((action, index) => <Button key={index} onClick={() => action.onClick(item)}>{action.name}</Button>) }
        </ListItem>
        })
      }
      <Button onClick={get}>Refresh</Button>
      <Button onClick={onCreateUser}>+ Random User</Button>
    </List>
  </div>
}