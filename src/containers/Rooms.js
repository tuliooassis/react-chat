import React, { useState } from 'react';
import Faker from 'faker';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import { RoomCounter } from '../containers/RoomCounter';
import { list, create } from '../infra/ejabberd-client/muc-client';
import { joinRoom, sendMessage } from '../infra/xmpp/stanza-client/stanza-client';

export const Rooms = () => {
  const [rooms, setRooms] = useState([])

  const get = async () => {
    const rooms = await list()
    setRooms(rooms)
  }

  const onJoinRoom = (name) => {
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    joinRoom(name, loggedUser.username)
    get()
  }

  const sendHello = (sendTo) => sendMessage(sendTo, 'Hello', 'groupchat')

  const onCreateRoom = () => {
    const name = Faker.name.firstName()
    create({ name })
    get()
  }

  const actions = [
    { onClick: onJoinRoom, name: 'Join'},
    { onClick: sendHello, name: 'Send Hello'},
  ]

  return <List subheader={'Available Rooms'}>
    { rooms.map((item, index) => {
      return <ListItem key={`item-${index}`}>
        <ListItemText secondary={item}/>
        <RoomCounter name={item}/>
        { actions.map((action, index) => <Button key={`action-${index}`} onClick={() => action.onClick(item)}>{action.name}</Button>) }
      </ListItem>
      })
    }
    <Button onClick={get}>Refresh</Button>
    <Button onClick={onCreateRoom}>+ Random Room</Button>
  </List>
}