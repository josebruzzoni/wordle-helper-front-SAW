import { Backdrop, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Appbar from "./Appbar"
import tournamentsService from "./services/tournaments"

const SubmitResults = () => {
    const [ attempts, setAttemtps ] = useState(1)
    const [ language, setLanguage ] = useState("English")
    const [ errorState, setErrorState ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    
    const navigate = useNavigate()

    const handleSubmit = (event) => {
      setLoading(true)
      event.preventDefault()
      const resultsObject = {
        failedAttempts: attempts,
        language: language === "English" ? "EN" : "ES",
      }
      tournamentsService.submitResults(resultsObject).then(
          response => {
            console.log(response)
            setLoading(false)
            navigate("/home")}
      ).catch((error) => {
        console.log(error)
        setLoading(false)
        setErrorState(true)
      })
    }

    const attemptsChange = (event) => {
      setAttemtps(event.target.value)
    }

    const languageChange = (event) => {
      setLanguage(event.target.value)
    }

    return (
        <div>
            <Appbar />
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, alignItems: "center" }}>
              <Typography variant="h3" textAlign={"left"}>
                  Load Daily Result
              </Typography>
              <form className="form" onSubmit={ handleSubmit } >
                  <Stack spacing={3} sx={{ textAlign: "left" }}>
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
                          <MenuItem value={6}>6</MenuItem>
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
                     
                     <Button variant="contained" color="primary" className="loginButton" type="submit" >Submit</Button>
                   </Stack>
                   
              </form>
              <Typography color="error" textAlign={"left"}>
                {errorState ? "Results already submitted for that language" : ""}
              </Typography>
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

export default SubmitResults