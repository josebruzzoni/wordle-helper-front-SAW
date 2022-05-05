import { useParams } from "react-router-dom"
import Appbar from "./Appbar"
import TournamentCard from "./TournamentCard"
import tournamentsService from "./services/tournaments";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Stack, Typography } from "@mui/material";

const Tournament = () => {
    const [ tournament, setTournament ] = useState(null)
    const [ leaderboard, setLeaderboard ] = useState([])
    const params = useParams()
    useEffect(() => {
        tournamentsService
            .getTournament(params.tournamentId)
            .then(response => {
                setTournament(response)
            })
        tournamentsService
            .getTournamentLeaderboard(params.tournamentId)
            .then(response => {
                setLeaderboard(response.leaderboard)
                console.log(response.leaderboard)
            })
    }, [params.tournamentId])

    return (
        <div>
            <Appbar />
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, textAlign: "left" }}>
                <Typography variant="h3" textAlign={"center"}>
                    Leaderboard
                </Typography>
                {tournament ? <TournamentCard tournament={tournament}></TournamentCard> : <div />}
                <div style={{ height: 400, width: "100%", background: "#ffffff"}}>
                    <DataGrid rows={leaderboard.map((u, i) => (
                        {
                            id: i + 1,
                            userName: u.user.username,
                            score: u.badScore
                        }
                    ))} columns={columns}/>
                </div>
            </Stack>

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