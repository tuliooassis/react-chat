import axios from 'axios'

const API = process.env.REACT_APP_API_ENDPOINT
const HOST = process.env.REACT_APP_DOMAIN

const ADMIN_USER = process.env.REACT_APP_ADMIN_USER
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD

const instance = axios.create({
  baseURL: API,
  auth: {
    username: ADMIN_USER,
    password: ADMIN_PASSWORD
  }
});

export const register = async ({ user, password }) => {
  const response = await instance.post('/register', {
    'host': HOST,
    user,
    password
  })
  return response.data
}

export const getAllUsers = async () => {
  const response = await instance.post('/registered_users', {
    'host': HOST,
  })
  return response.data
}

export const getConnectedUsers = async () => {
  const response = await instance.get('/connected_users_info')
  return response.data
}

export const getPresence = async (user) => {
  const response = await instance.post('/get_presence', {
    user,
    host: HOST
  })
  return response.data
}


