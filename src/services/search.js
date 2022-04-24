import axios from 'axios'
import authService from "./auth"; 

const baseUrl = 'http://localhost:8080/dictionaries'

const search = newObject => {
    const url = baseUrl + "/" + newObject.language + "/words/" + newObject.word
    const request = axios.get(url, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

export default { search }