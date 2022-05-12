import TournamentList from "./TournamentList"

const PublicTournaments = () => {
    return (
        <TournamentList onlyMyTournaments={false}/>
    )
}

export default PublicTournaments