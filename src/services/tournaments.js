import axios from 'axios'
import authService from "./auth"; 

const baseUrl = 'http://localhost:8080/v1/tournaments'

const getAllPublicTournaments = () => {
    const request = axios.get(baseUrl, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const addTournament = (newObject) => {
    const request = axios.post(baseUrl, newObject, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const tournamentsService = {
    getAllPublicTournaments,
  }

export default tournamentsService