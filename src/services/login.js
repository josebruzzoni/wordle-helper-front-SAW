import axios from 'axios'

const baseUrl = 'http://localhost:8080/sessions'

const login = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data.token)
}

const loginService = {
  login,
}

export default loginService