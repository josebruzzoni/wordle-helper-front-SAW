import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Backdrop, CircularProgress, MenuItem, Select, InputLabel, IconButton } from "@mui/material"
import { useState } from "react"
import Appbar from "./Appbar"
import HelperGrid from "./HelperGrid"
import helperService from "./services/helper"
import HelpIcon from '@mui/icons-material/HelpOutline';

const Helper = () => {
    const [ language, setLanguage ] = useState("EN")
    const [ openResults, setOpenResults ] = useState(false)
    const [ openHelp, setOpenHelp ] = useState(false)
    const [ possibleWords, setPossibleWords ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ attempts, setAttemtps ] = useState(1)
    const [ errorState, setErrorState ] = useState(false)

    const languageChange = (event) => {
        setLanguage(event.target.value)
      }
    
    const handleResultsAlert = (open) => {
        setOpenResults(open)
    }

    const handleHelpAlert = (open) => {
        setOpenHelp(open)
    }

    const handleSubmit = (grid) => {
        setLoading(true)
        helperService.searchPossibleWords(language, grid, attempts).then(
            words => {
                console.log(words)
                errorChange(false)
                setPossibleWords(words.possibleWords)
                setLoading(false)
                handleResultsAlert(true)
            }
          ).catch((error) => {
            console.log(error)
            setLoading(false)
          })
    }

    const errorChange = (error) => {
        setErrorState(error)
    }

    const attemptsChange = (event) => {
        setAttemtps(event.target.value)
      }

    return (
        <div>
            <Appbar/>
            <Stack className="main-stack" textAlign={"left"} spacing={1}>
                <Stack direction="row">
                    <Typography variant="h3">
                        Helper
                    </Typography>
                    <IconButton color="primary" aria-label="help" onClick={() => handleHelpAlert(true)}>
                        <HelpIcon color="primary"/>
                    </IconButton>
                </Stack>
                <form style={{maxWidth: 660, background: "#ffffff", padding: "10px"}}>
                    <Stack spacing={1}>
                        <FormControl>
                            <InputLabel id="attempts-select">Attempts</InputLabel>
                            <Select
                            labelId="attempts-select-label"
                            id="attempts-select"
                            value={attempts}
                            label="Attempts"
                            onChange={attemptsChange}
                            >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                        <FormLabel id="language-radio-buttons">Language</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="language-radio-buttons"
                            value={language}
                            name="language-radio-buttons-group"
                            onChange={languageChange}
                        >
                            <FormControlLabel value="EN" control={<Radio />} label="English" />
                            <FormControlLabel value="ES" control={<Radio />} label="Spanish" />
                        </RadioGroup>
                        </FormControl>
                        <HelperGrid onSubmitHandler={handleSubmit} attempts={attempts} onError={errorChange}/>
                    </Stack>
                </form>
                <Typography color="error" textAlign={"left"}>
                    {errorState ? "Please complete with all the words you tried" : ""}
                </Typography>
                <Dialog
                    open={openResults}
                    onClose={() => handleResultsAlert(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Possible words</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography textAlign={"left"}>{possibleWords.map(w => w.toLowerCase()).join(", ")}</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                            <Button onClick={() => handleResultsAlert(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openHelp}
                    onClose={() => handleHelpAlert(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{language === "EN" ? "How to use" : "Como usar"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {language === "EN" ?
                            <Typography textAlign={"left"}>
                                <p>1. Select the number of attempts you did</p>
                                <p>2. Write each word you tried</p>
                                <p>3. Click through the buttons to select right color for each character</p>
                            </Typography>
                            :
                            <Typography textAlign={"left"}>
                                <p>1. Seleccioná la cantidad de intentos que realizaste</p>
                                <p>2. Escribí cada palabra</p>
                                <p>3. Clickeá los botones para seleccionar el color correcto de cada letra</p>
                            </Typography>
                            }
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                            <Button onClick={() => handleHelpAlert(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
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

export default Helper