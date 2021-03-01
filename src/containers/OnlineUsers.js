import React, { useState } from 'react';
import { getConnectedUsers } from '../infra/ejabberd-client/user-client';
import { sendMessage } from '../infra/xmpp/stanza-client/stanza-client';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';

export const OnlineUsers = () => {
  const [users, setUsers] = useState([])

  const get = async () => {
    const users = await getConnectedUsers()
    setUsers(users)
  }

  const sendHi = (sendTo) => sendMessage(sendTo.jid, 'Hi')

  const actions = [
    { onClick: sendHi, name: 'Send Hi'}
  ]

  return <List subheader={'Connected Users'}>
    { users.map((item, index) => {
      return <ListItem key={index}>
        <ListItemText secondary={item['jid']}/>
        { actions.map((action, index) => <Button key={index} onClick={() => action.onClick(item)}>{action.name}</Button>) }
      </ListItem>
      })
    }
    <Button onClick={get}>Refresh</Button>
  </List>
}