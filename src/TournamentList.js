import { Backdrop, Box, CircularProgress, Fab, List, ListItem, Stack, Typography } from "@mui/material"
import tournamentsService from "./services/tournaments";
import Appbar from "./Appbar"
import { useEffect, useState } from "react";
import TournamentCard from "./TournamentCard";
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useNavigate } from "react-router-dom";

const TournamentList = ({onlyMyTournaments}) => {
    const [ tournaments, setTournaments ] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(onlyMyTournaments){
            tournamentsService
            .getAllTournamentsByUser()
            .then(response => {
                setTournaments(response.tournaments)
            })
        }else{
            tournamentsService
                .getAllPublicTournaments()
                .then(response => {
                    setTournaments(response.tournaments)
                })
        }

    }, [loading, onlyMyTournaments])

    const navigate = useNavigate()

    const handleAddButton = () => {
        navigate("/create-tournament")
    }

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

    return (
        <div>
            <Appbar>
            </Appbar>
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, textAlign: "left" }}>
                <Typography variant="h3" textAlign={"center"}>
                    {onlyMyTournaments ? "My Tournaments" : "Public Tournaments"}
                </Typography>
                <List>
                    {console.log(tournaments)}
                    {tournaments.map(t =>
                        <ListItem key={t.id}>
                            <TournamentCard tournament={t} onRegisterClick={handleJoinClick}></TournamentCard>
                        </ListItem>
                    )}
                </List>
                <Box sx={{ justifyContent: "flex-end", alignItems: "flex-end", display: "flex" }}>
                    <Fab color="primary" aria-label="add" onClick={handleAddButton}>
                        <AddIcon color="white"/>
                    </Fab>
                </Box>
                
            </Stack>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Outlet />
        </div>

    )
}

export default TournamentList