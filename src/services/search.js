import axios from 'axios'
const baseUrl = 'http://localhost:8080/dictionaries'

const token = "Bearer " + sessionStorage.getItem("token")

const headers = {
    'Authorization': token
}

const search = newObject => {
    const url = baseUrl + "/" + newObject.language + "/words/" + newObject.word
    const request = axios.get(url, {
        headers: headers
    })
    return request.then(response => response.data)
}

export default { search }