import jwt_decode from "jwt-decode"

const isLoggedIn = () => {
    return sessionStorage.getItem("token") != null
}

const getHeaders = () => {
    const token = "Bearer " + sessionStorage.getItem("token")
    const headers = {
        'Authorization': token
    }
    return headers
}

const logout = () => {
    if(isLoggedIn){
        sessionStorage.removeItem("token")
    }
}

const getUserId = () => {
    const token = sessionStorage.getItem("token")
    return jwt_decode(token).jti
}

const loginService = {
    isLoggedIn, 
    getHeaders, 
    logout,
    getUserId,
  }

export default loginService