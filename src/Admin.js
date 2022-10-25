import { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Appbar from "./Appbar";
import authService from "./services/auth"; 
import adminService from "./services/admin";
import { DataGrid } from "@mui/x-data-grid";

const Admin = () => {
    const [ word, setWord ] = useState("")
    const [ definition, setDefinition ] = useState("")
    const [ errorState, setErrorState ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ table, setTable ] = useState([])


    useEffect(() => {
        adminService
            .getAdmin()
            .then(response => {
                setTable(response)
                console.log(response)
            })
    }, [definition, loading])

    const handleSearch = (event) => {
        setLoading(true)
        event.preventDefault()
        console.log(authService.getHeaders())
        adminService.admin(word).then(
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
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, textAlign: "left" }}>
                <Typography variant="h3" textAlign={"left"}>
                    Admin
                </Typography>
                <form className="form" onSubmit={ handleSearch } >
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField id="outlined-search" label={"Add user"} value={ word } 
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
                <div style={{ height: 400, width: "100%", background: "#ffffff"}}>
                    <DataGrid rows={table.map((u, i) => (
                        {
                            id: i + 1,
                            userName: u.name,
                            score: u.score
                        }
                    ))} columns={columns}/>
                </div>
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

const columns = [
    { field: 'id', headerName: 'Position', width: 70 },
    { field: 'userName', headerName: 'Player', width: 230 },
    {
      field: 'score',
      headerName: 'Score',
      width: 260
    },
  ];

export default Admin;
