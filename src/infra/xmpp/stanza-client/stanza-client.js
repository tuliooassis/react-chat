import * as XMPP from 'stanza'

const WEBSOCKET = process.env.REACT_APP_WEBSOCKET
const HOST = process.env.REACT_APP_DOMAIN

// eslint-disable-next-line
const log = (name, data) => {
  console.log(`Event ${name}`, data)
}

let globalClient

export const create = (username, password) => {
  if (globalClient) return globalClient

  const config = {
    jid: username,
    password,
    server: HOST,
    transports: {
      websocket: WEBSOCKET
    }
  }

  const client = XMPP.createClient(config)
  globalClient = client

  // client.on('*', log);

  client.on('session:started', () => {
    client.getRoster()
    client.sendPresence()
  })

  client.on('message', msg => {
    if (msg.body) alert(`You received ${msg.body} from ${msg.from}`)
  })

  client.connect()
  return client
}

export const sendMessage = (to, body, type) => {
  globalClient?.sendMessage({
    to,
    from: globalClient.jid,
    body,
    type
  })
}

export const joinRoom = async (room, nick) => {
  globalClient?.joinRoom(room, nick)
  const roomMembers = await globalClient.getRoomMembers(room)

  return roomMembers
}

export const deleteAccount = async (user) => {
  return await globalClient?.deleteAccount(user)
}

export const logout = () => {
  globalClient?.disconnect()
  globalClient = null
}
