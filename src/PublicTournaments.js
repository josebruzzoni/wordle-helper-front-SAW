import { Box, Fab, List, ListItem, Stack, Typography } from "@mui/material"
import tournamentsService from "./services/tournaments";
import Appbar from "./Appbar"
import { useEffect, useState } from "react";
import Tournament from "./Tournament";
import AddIcon from '@mui/icons-material/Add';

const PublicTournaments = () => {
    const [ tournaments, setTournaments ] = useState([])

    useEffect(() => {
        tournamentsService
            .getAllPublicTournaments()
            .then(response => {
                setTournaments(response.tournaments)
            })
    }, [])
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
                            <Tournament tournament={t}></Tournament>
                        </ListItem>
                    )}
                </List>
                <Box sx={{ justifyContent: "flex-end", alignItems: "flex-end", display: "flex" }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon color="white"/>
                    </Fab>
                </Box>
                
            </Stack>
        </div>

    )
}

export default PublicTournaments