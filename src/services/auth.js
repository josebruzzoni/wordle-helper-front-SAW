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

const loginService = {
    isLoggedIn, 
    getHeaders, 
    logout,
  }

export default loginService