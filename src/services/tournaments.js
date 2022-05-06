import axios from 'axios'
import authService from "./auth"; 

const baseUrl = 'http://localhost:8080/v1/tournaments'
const usersUrl = 'http://localhost:8080/v1/users'

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

const getTournament = (id) => {
    const request = axios.get(baseUrl + "/" + id, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const submitResults = (newObject) => {
    const request = axios.post(usersUrl + "/" + authService.getUserId() + "/results", newObject, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const joinTournament = (id) => {
    const participant = {
        participantName: sessionStorage.getItem("username"),
    }
    const request = axios.post(baseUrl + "/" + id + "/participants", participant, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const addParticipant = (id, participantUsername) => {
    const participant = {
        participantName: participantUsername,
    }
    const request = axios.post(baseUrl + "/" + id + "/participants", participant, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const getTournamentLeaderboard = (id) => {
    const request = axios.get(baseUrl + "/" + id + "/leaderboard", {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const tournamentsService = {
    getAllPublicTournaments,
    getTournament,
    addTournament,
    getTournamentLeaderboard,
    joinTournament,
    submitResults,
    addParticipant,
  }

export default tournamentsService