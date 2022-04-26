import { TextField, Button, Stack, Typography } from "@mui/material";
import "./styles.css";
import { ReactComponent as Logo } from "./Wordle Helper logo-03.svg"
import { useState } from "react";
import loginService from "./services/login";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorState, setErrorState ] = useState(false)

  const navigate = useNavigate()
  
  const handleLogin = (event) => {
    event.preventDefault()
    const loginObject = {
      username: username,
      password: password,
    }
    loginService.login(loginObject).then(
      token => {
        sessionStorage.setItem("token", token)
        navigate("/dictionary")}
    ).catch((error) => {
      console.log(error)
      setErrorState(true)
    })
  }

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Stack className="main-stack">
        <Logo />
        <form className="form" onSubmit={ handleLogin } >
            <TextField variant="standard" label="Username" onChange={ usernameChange } 
              value={ username } required={true} error={ errorState } />
            <TextField variant="standard" type="password" label="Password" onChange={ passwordChange } 
              value={ password } required={true} error={ errorState } helperText={errorState ? "Username or password invalid" : ""}/>
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
