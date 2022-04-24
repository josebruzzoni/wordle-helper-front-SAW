import { Navigate, useLocation } from "react-router-dom";
import authService from "./services/auth";

const PublicRoute = (props) => {
    const { children } = props
    const isLoggedInBool = authService.isLoggedIn()
    const location = useLocation()
  
    return !isLoggedInBool ? (
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/dictionary"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  export default PublicRoute