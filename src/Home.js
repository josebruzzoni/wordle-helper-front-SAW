import { Button, Card, CardActions, CardContent, CardMedia, Fab, Menu, MenuItem, Stack, Typography } from "@mui/material";
import englishImg from "./english.jpeg"
import spanishImg from "./spanish.jpeg"
import Appbar from "./Appbar";
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjectsOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const navigate = useNavigate()

    const handleButton = (path) => {
        navigate(path)
    }
    
    const open = Boolean(anchorEl)
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
     const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Appbar></Appbar>
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, textAlign: "left" }}>
                <Typography gutterBottom variant="h4" component="div">
                    Welcome {sessionStorage.getItem("username")}!
                </Typography>
                <Stack spacing={2} direction="row">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={englishImg}
                            alt="english wordle"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            English Wordle
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Guess the WORDLE in six tries. Each guess must be a valid five-letter word. Hit the enter button to submit. 
                            After each guess, the color of the tiles will change to show how close your guess was to the word.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none' }}>
                                <Button size="small">PLAY NOW</Button>
                            </a>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={spanishImg}
                            alt="spanish wordle"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Wordle en Español
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Adivina la palabra oculta en seis intentos. Cada intento debe ser una palabra válida de 5 letras.
                            Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href="https://wordle.danielfrg.com/" target="_blank" rel="noreferrer noopener" style={{ textDecoration: 'none' }}>
                                <Button size="small" >JUGÁ AHORA</Button>
                            </a>
                        </CardActions>
                    </Card>
                </Stack>
                <Stack spacing={2} direction="row" justifyContent="center">
                    <Fab variant="extended" color="primary">
                        <EmojiObjectsIcon sx={{ mr: 1 }} color="white" />
                        <Typography color="common.white">Helper</Typography>
                    </Fab>
                    <Fab variant="extended" color="primary" onClick={() => handleButton("/dictionary")}>
                        <MenuBookIcon sx={{ mr: 1 }} color="white" />
                        <Typography color="common.white">Dictionary</Typography>
                    </Fab>
                    <Fab variant="extended" color="primary" aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <EmojiEventsIcon sx={{ mr: 1 }} color="white" />
                        <Typography color="common.white">Tournaments</Typography>
                    </Fab>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => handleButton("/my-tournaments")}>My tournaments</MenuItem>
                        <MenuItem onClick={() => handleButton("/public-tournaments")}>Public tournaments</MenuItem>
                        <MenuItem onClick={() => handleButton("/create-tournament")}>Create tournament</MenuItem>
                        <MenuItem onClick={() => handleButton("/submit-results")}>Submit results</MenuItem>
                    </Menu>
                </Stack>
            </Stack>
        </div>
    )
}

export default Home;