import axios from 'axios'
import authService from "./auth"; 

const baseUrl = 'http://localhost:8080/v1/helper'

const searchPossibleWords = (language, grid) => {
    const url = baseUrl + "/words?language=" + language + "&grey=DUELTRA&yellow=G__I_&green=____O"
    const request = axios.get(url, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const helperService = {
    searchPossibleWords,
  }

export default helperService