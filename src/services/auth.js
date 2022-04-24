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

export default { isLoggedIn, getHeaders, logout }