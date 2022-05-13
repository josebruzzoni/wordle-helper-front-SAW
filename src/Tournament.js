import { useParams } from "react-router-dom"
import Appbar from "./Appbar"
import TournamentCard from "./TournamentCard"
import tournamentsService from "./services/tournaments";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Backdrop, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Tournament = () => {
    const [ tournament, setTournament ] = useState(null)
    const [ leaderboard, setLeaderboard ] = useState([])
    const [loading, setLoading] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [participant, setParticipant] = useState("")
    const [errorState, setErrorState] = useState(false)

    const params = useParams()
    useEffect(() => {
        tournamentsService
            .getTournament(params.tournamentId)
            .then(response => {
                setTournament(response)
                setIsOwner(sessionStorage.getItem("username") === response.owner)
            })
        tournamentsService
            .getTournamentLeaderboard(params.tournamentId)
            .then(response => {
                setLeaderboard(response.leaderboard)
                console.log(response.leaderboard)
            })
    }, [params.tournamentId, loading])

    const handleJoinClick = (id) => {
        setLoading(true)
        tournamentsService
            .joinTournament(id)
            .then( response => {
                console.log(response)
                setLoading(false)
            }
            ).catch((error) => {
                console.log(error)
                setLoading(false)
            })
    }

    const handleAdd = (event) => {
        event.preventDefault()
        setLoading(true)
        setErrorState(false)
        if(!tournament.participants.includes(participant)){
            tournamentsService
                .addParticipant(tournament.id, participant)
                .then( response => {
                    console.log(response)
                    setLoading(false)
                }
                ).catch((error) => {
                    console.log(error)
                    setLoading(false)
                    setErrorState(true)
                })
        }else{
            setLoading(false)
            setErrorState(true)
        }

    }

    const participantChange = (event) => {
        setParticipant(event.target.value)
      }

    return (
        <div>
            <Appbar />
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, textAlign: "left" }}>
                <Typography variant="h3" textAlign={"center"}>
                    Leaderboard
                </Typography>
                {tournament ? <TournamentCard tournament={tournament} onRegisterClick={handleJoinClick}></TournamentCard> : <div />}
                {isOwner && !(new Date(tournament.startDate) < new Date()) ? <form onSubmit={ handleAdd } style={{maxWidth: 660, background: "#ffffff", padding: "10px"}}>
                    <Stack spacing={1} direction="row"  alignItems={"center"}>
                      <TextField variant="standard" label="Participant username" onChange={ participantChange } 
                        value={ participant } required={true} error={errorState} helperText={errorState ? "Invalid username" : ""}/>
                      <Button variant="contained" color="primary" style={{color: "#ffffff"}} type="submit" endIcon={<PersonAddIcon color="white"/>}>Add participant</Button>
                    </Stack>
                </form> : ""}
                <div style={{ height: 400, width: "100%", background: "#ffffff"}}>
                    <DataGrid rows={leaderboard.map((u, i) => (
                        {
                            id: i + 1,
                            userName: u.user.username,
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

export default Tournament