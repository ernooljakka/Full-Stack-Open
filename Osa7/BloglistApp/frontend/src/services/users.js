import axios from 'axios'

const baseUrl = '/api/login'
const userUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const login = async (credentials) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, credentials, config)
  return response.data
}

const getAllUsers = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(userUrl, config)
  return response.data
}

export default { login, setToken, getAllUsers }
