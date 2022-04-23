import { TextField, Button, Stack, Typography } from "@mui/material";
import "./styles.css";
import { ReactComponent as Logo } from "./Wordle Helper logo-03.svg"
import { useState } from "react";
import loginService from "./services/login";
import Signup from "./Signup";
import Dictionary from "./Dictionary";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")

  const navigate = useNavigate()
  
  const handleLogin = (event) => {
    event.preventDefault()
    const loginObject = {
      username: username,
      password: password,
    }
    loginService.login(loginObject).then(
      token => sessionStorage.setItem("token", token)
    )
    navigate("/dictionary")
  }

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Stack className="stack">
        <Logo />
        <form className="form" onSubmit={ handleLogin } >
            <TextField variant="standard" label="Username" onChange={ usernameChange } value={ username }/>
            <TextField variant="standard" type="password" label="Password" onChange={ passwordChange } value={ password } />
            <Button variant="contained" color="primary" className="loginButton" type="submit" >Log in</Button>
        </form>
        <Stack direction={"row"} spacing={1}>
            <Typography>
                Don't have an account?
            </Typography>
            <Typography>
                <Link to="/signup">Sign up</Link>
            </Typography>
        </Stack>
    </Stack>
    
  )
}

export default Login;
