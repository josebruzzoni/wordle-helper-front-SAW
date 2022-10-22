import axios from 'axios'
import authService from "./auth"; 

const baseUrl = 'http://localhost:8080/v1/admin'

const admin = adminString => {
    const request = axios.post(baseUrl, adminString, {
        headers: authService.getHeaders()
    })
    return request.then(response => response.data)
}

const adminService = {
    admin,
  }

export default adminService