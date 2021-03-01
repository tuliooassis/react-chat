import axios from 'axios'

const API = process.env.REACT_APP_API_ENDPOINT
const HOST = process.env.REACT_APP_DOMAIN
const MUC_SERVICE = process.env.REACT_APP_MUC_SERVICE

const ADMIN_USER = process.env.REACT_APP_ADMIN_USER
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD

const instance = axios.create({
  baseURL: API,
  auth: {
    username: ADMIN_USER,
    password: ADMIN_PASSWORD
  }
});

export const create = async ({ name }) => {
  const response = await instance.post('/create_room_with_opts', {
    'host': HOST,
    service: MUC_SERVICE,
    name,
    options: {
      name: 'muc_public',
      value: 'true'
    }
  })

  return response.data
}

export const destroy = async ({ name }) => {
  return await instance.post('/destroy_room', {
    service: MUC_SERVICE,
    name
  })
}

export const list = async () => {
  const response = await instance.post('/muc_online_rooms', {
    service: MUC_SERVICE,
  })

  return response.data
}

export const occupantsNumber = async ({ name }) => {
  const response = await instance.post('/get_room_occupants_number', {
    service: MUC_SERVICE,
    name
  })

  return response.data
}