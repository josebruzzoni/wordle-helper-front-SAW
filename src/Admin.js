import { useState } from "react";
import { Backdrop, Button, CircularProgress, Fab, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Appbar from "./Appbar";
import authService from "./services/auth"; 
import adminService from "./services/admin";

const Admin = () => {
    const [ word, setWord ] = useState("")
    const [ definition, setDefinition ] = useState("")
    const [ errorState, setErrorState ] = useState(false)
    const [ loading, setLoading ] = useState(false)


    const handleSearch = (event) => {
        setLoading(true)
        event.preventDefault()
        const adminString = {
            word: word,
        }
        console.log(authService.getHeaders())
        adminService.admin(adminString).then(
            aString => {
                setErrorState(false)
                console.log(aString)
                setDefinition(aString.word)
                setLoading(false)
            }
          ).catch((error) => {
            console.log(error)
            setErrorState(true)
            setLoading(false)
          })
    }

    const wordChange = (event) => {
        setWord(event.target.value)
      }

    return (
        <div>
            <Appbar>

            </Appbar>
            <Stack className="main-stack" >
                <Typography variant="h3" textAlign={"left"}>
                    Admin
                </Typography>
                <form className="form" onSubmit={ handleSearch } >
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField id="outlined-search" label={"Search user"} value={ word } 
                                onChange={ wordChange } required={true} error={ errorState } helperText={errorState ? "There was an unexpected error" : ""}/>
                            <Button variant="contained" color="primary" className="searchButton" type="submit">
                                <SearchIcon color="#ffffff"/>
                            </Button>
                        </Stack>
                        <Typography variant="body1" textAlign={"left"}>
                            {definition}
                        </Typography>
                    </Stack>
                </form>
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Admin;
