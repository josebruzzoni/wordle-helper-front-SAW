import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Backdrop, CircularProgress, MenuItem, Select, InputLabel } from "@mui/material"
import { useState } from "react"
import Appbar from "./Appbar"
import HelperGrid from "./HelperGrid"
import helperService from "./services/helper"

const Helper = () => {
    const [ language, setLanguage ] = useState("English")
    const [ openResults, setOpenResults ] = useState(false)
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

    const handleSubmit = (grid) => {
        setLoading(true)
        const greyLetters = getGreyLetters(grid)
        console.log(greyLetters)
        helperService.searchPossibleWords(language === "English" ? "EN" : "ES", grid[attempts-1]).then(
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

    const getGreyLetters = (grid) => {
        const greyLetters = []
        grid.forEach(word => {
            if(word.letters !== ""){
                const letterColors = word.colors.split("")
                const chars = word.letters.split("")
                letterColors.forEach((letterColor, index) => {
                    if(letterColor === "n" && !greyLetters.includes(chars[index])){
                        greyLetters.push(chars[index])
                    }
                })
            }
        })
        return greyLetters.join("")
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
                <Typography variant="h3">
                    Helper
                </Typography>
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
                            <FormControlLabel value="English" control={<Radio />} label="English" />
                            <FormControlLabel value="Spanish" control={<Radio />} label="Spanish" />
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