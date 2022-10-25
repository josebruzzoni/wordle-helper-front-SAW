import axios from 'axios'
import authService from "./auth"; 

const baseUrl = 'http://localhost:8080/v1/admin'

const admin = adminString => {
    const request = axios.post(baseUrl, adminString, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const getAdmin = () => {
    const request = axios.get(baseUrl, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const adminService = {
    admin, getAdmin,
  }

export default adminService