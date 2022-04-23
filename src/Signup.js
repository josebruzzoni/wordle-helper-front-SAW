import { TextField, Button, Stack, Typography } from "@mui/material";
import "./styles.css";
import { ReactComponent as Logo } from "./Wordle Helper logo-03.svg"
import { useState } from "react";
import signupService from "./services/signup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ repeatPassword, setRepeatPassword ] = useState("")

  const handleSignup = (event) => {
    event.preventDefault()
    if(password === repeatPassword){
        const signObject = {
            username: username,
            password: password,
        }
        signupService.signup(signObject).then(
            user => console.log(user)
        )
    }else{

    }
    
  }

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }

  const repeatedPasswordChange = (event) => {
    setRepeatPassword(event.target.value)
  }

  return (
    <Stack className="stack">
        <Logo />
        <form className="form" onSubmit={ handleSignup } >
            <TextField variant="standard" label="Username" onChange={ usernameChange } value={ username }/>
            <TextField variant="standard" type="password" label="Password" onChange={ passwordChange } value={ password } />
            <TextField variant="standard" type="password" label="Repeat Password" onChange={ repeatedPasswordChange } value={ repeatPassword } />
            <Button variant="contained" color="primary" className="loginButton" type="submit" >Sign up</Button>
        </form>
        <Stack direction={"row"} spacing={1}>
            <Typography>
                Already a member?
            </Typography>
            <Typography>
                <Link to="/login">Log in</Link>
            </Typography>
        </Stack>
    </Stack>
    
  )
}

export default Signup;
