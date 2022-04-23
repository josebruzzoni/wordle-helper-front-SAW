import axios from 'axios'
const baseUrl = 'http://localhost:8080/users'

const token = "Bearer " + sessionStorage.getItem("token")

const headers = {
    'Authorization': token
}

const signup = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data.token)
}

export default { signup }