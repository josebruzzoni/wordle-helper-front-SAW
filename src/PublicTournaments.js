import { Box, Fab, List, ListItem, Stack, Typography } from "@mui/material"
import tournamentsService from "./services/tournaments";
import Appbar from "./Appbar"
import { useEffect, useState } from "react";
import TournamentCard from "./TournamentCard";
import AddIcon from '@mui/icons-material/Add';
import { Outlet, useNavigate } from "react-router-dom";

const PublicTournaments = () => {
    const [ tournaments, setTournaments ] = useState([])

    useEffect(() => {
        tournamentsService
            .getAllPublicTournaments()
            .then(response => {
                setTournaments(response.tournaments)
            })
    }, [])

    const navigate = useNavigate()

    const handleAddButton = () => {
        navigate("/create-tournament")
    }

    return (
        <div>
            <Appbar>
            </Appbar>
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, textAlign: "left" }}>
                <Typography variant="h3" textAlign={"center"}>
                    Public Tournaments
                </Typography>
                <List>
                    {console.log(tournaments)}
                    {tournaments.map(t =>
                        <ListItem key={t.id}>
                            <TournamentCard tournament={t}></TournamentCard>
                        </ListItem>
                    )}
                </List>
                <Box sx={{ justifyContent: "flex-end", alignItems: "flex-end", display: "flex" }}>
                    <Fab color="primary" aria-label="add" onClick={handleAddButton}>
                        <AddIcon color="white"/>
                    </Fab>
                </Box>
                
            </Stack>
            <Outlet />
        </div>

    )
}

export default PublicTournaments