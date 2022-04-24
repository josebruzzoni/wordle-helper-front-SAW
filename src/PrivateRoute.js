import { Navigate, useLocation } from "react-router-dom";
import authService from "./services/auth";

const PrivateRoute = (props) => {
    const { children } = props
    const isLoggedInBool = authService.isLoggedIn()
    const location = useLocation()
  
    return isLoggedInBool ? (
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/login"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  export default PrivateRoute