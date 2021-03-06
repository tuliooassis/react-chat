import React, { useState } from 'react'
import Faker from 'faker'
import { Button, List, ListItem, ListItemText } from '@material-ui/core'
import { RoomCounter } from '../containers/RoomCounter'
import { list, create, destroy } from '../infra/ejabberd-client/muc-client'
import { joinRoom, sendMessage } from '../infra/xmpp/stanza-client/stanza-client'

export const Rooms = () => {
  const [rooms, setRooms] = useState([])

  const get = async () => {
    const rooms = await list()
    setRooms(rooms)
  }

  const sendHello = (sendTo) => sendMessage(sendTo, 'Hello', 'groupchat')

  const onJoinRoom = async (name) => {
    const loggedUser = JSON.parse(localStorage.getItem('user'))
    await joinRoom(name, loggedUser.username)
    get()
  }

  const onCreateRoom = async () => {
    const name = Faker.name.firstName()
    await create({ name })
    get()
  }

  const onDeleteRoom = async (name) => {
    const shortName = name.split('@')[0]
    await destroy({ name: shortName })
    get()
  }

  const actions = [
    { onClick: onJoinRoom, name: 'Join' },
    { onClick: onDeleteRoom, name: 'Delete' },
    { onClick: sendHello, name: 'Send Hello' }
  ]

  return <div className="App-container">
    <List subheader={'Available Rooms'}>
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
  </div>
}
