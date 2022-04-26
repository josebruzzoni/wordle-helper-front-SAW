const isLoggedIn = () => {
    return sessionStorage.getItem("token") != null
}

const token = "Bearer " + sessionStorage.getItem("token")

const headers = {
    'Authorization': token
}

const getHeaders = () => {
    return headers
}

const logout = () => {
    if(isLoggedIn){
        sessionStorage.removeItem("token")
    }
}

const loginService = {
    isLoggedIn, 
    getHeaders, 
    logout,
  }

export default loginService