import { Card, CardActions, CardContent, CardHeader, Chip, Collapse, IconButton, Typography } from "@mui/material"
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "@emotion/styled";
import EmojiEventsOutIcon from '@mui/icons-material/EmojiEventsOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Link } from "react-router-dom";

const TournamentCard = ({ tournament }) => {
  const [expanded, setExpanded] = useState(false)
  const [joined, setJoined] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleJoinClick = () => {
    setJoined(!joined);
  }

  return (
    <Card sx={{ minWidth: 660 }}>
      <CardHeader
        action={
          <IconButton aria-label="join" color="primary" onClick={handleJoinClick}>
            {joined ? <EmojiEventsIcon /> : <EmojiEventsOutIcon />}
          </IconButton>
        }
        title={<Link to={"/public-tournaments/" + tournament.id} style={{ textDecoration: 'none' }}>{tournament.name}</Link>}
        subheader={tournament.startDate + " to " + tournament.endDate}
      />
      <CardActions>
        {tournament.languages.map(l =>
          <Chip key={l} label={l === "EN" ? "English" : "Español"} />
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Owner: {tournament.owner}</Typography>
          <Typography>Participants:{tournament.participants.map(p => " " + p)}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default TournamentCard