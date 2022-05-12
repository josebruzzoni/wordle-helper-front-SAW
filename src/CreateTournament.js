import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Appbar from "./Appbar"
import tournamentsService from "./services/tournaments"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from "@mui/x-date-pickers"
import { format, addDays } from "date-fns"

const CreateTournament = () => {
    const [ tournamentName, setTournamentName ] = useState("")
    const [ startDate, setStartDate ] = useState(addDays(new Date(), 1))
    const [ endDate, setEndDate ] = useState(addDays(new Date(), 1))
    const [ visibility, setVisibility ] = useState("Public")
    const [ languages, setLanguages ] = useState("English")
    const [ errorState, setErrorState ] = useState(false)

    const navigate = useNavigate()

    const handleCreate = (event) => {
        event.preventDefault()
        const languagesArray = []
        if(languages === "Both"){
          languagesArray[0] = "EN"
          languagesArray[1] = "ES"
        }else{
          languagesArray[0] = languages === "English" ? "EN" : "ES"
        }
        if(startDate <= endDate){
            const tournamentObject = {
                name: tournamentName,
                startDate: format(startDate, "yyyy-MM-dd"),
                endDate: format(endDate, "yyyy-MM-dd"),
                visibility: visibility.toUpperCase(),
                languages: languagesArray,
            }
            console.log(tournamentObject)
            tournamentsService.addTournament(tournamentObject).then(
                tournament => {
                  console.log(tournament)
                  navigate("/my-tournaments")}
            ).catch((error) => {
              console.log(error)
              setErrorState(true)
            })
        }else{
          setErrorState(true)
        }
        
      }

    const nameChange = (event) => {
        setTournamentName(event.target.value)
      }
    const startDateChange = (newValue) => {
        setStartDate(newValue)
      }
    const endDateChange = (newValue) => {
        setEndDate(newValue)
      }
    const visibilityChange = (event) => {
        setVisibility(event.target.value)
      }
    const languagesChange = (event) => {
        setLanguages(event.target.value)
      }

    return (
        <div>
            <Appbar />
            <Stack className="main-stack" spacing={2} sx={{ maxWidth: 660, alignItems: "center" }}>
              <Typography variant="h2" textAlign={"left"}>
                  New Tournament
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form className="form" onSubmit={ handleCreate } >
                    <Stack spacing={3} sx={{ textAlign: "left" }}>
                      <TextField variant="standard" label="Tournament name" onChange={ nameChange } 
                        value={ tournamentName } required={true} />
                      <DesktopDatePicker
                        label="Start Date"
                        inputFormat="MM/dd/yyyy"
                        value={startDate}
                        onChange={startDateChange}
                        minDate={addDays(new Date(), 1)}
                        renderInput={(params) => <TextField {...params} error={errorState} />}
                      />
                      <DesktopDatePicker
                        label="End Date"
                        inputFormat="MM/dd/yyyy"
                        value={endDate}
                        onChange={endDateChange}
                        minDate={addDays(new Date(), 1)}
                        renderInput={(params) => <TextField {...params} error={errorState} helperText={errorState ? "Please check selected dates" : ""}/>}
                      />
                      <FormControl>
                        <FormLabel id="visibility-radio-buttons">Visibility</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="visibility-radio-buttons"
                          value={visibility}
                          name="visibility-radio-buttons-group"
                          onChange={visibilityChange}
                        >
                          <FormControlLabel value="Public" control={<Radio />} label="Public" />
                          <FormControlLabel value="Private" control={<Radio />} label="Private" />
                        </RadioGroup>
                      </FormControl>
                      <FormControl>
                        <FormLabel id="languages-radio-buttons">Languages</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="languages-radio-buttons"
                          value={languages}
                          name="languages-radio-buttons-group"
                          onChange={languagesChange}
                        >
                          <FormControlLabel value="English" control={<Radio />} label="English" />
                          <FormControlLabel value="Spanish" control={<Radio />} label="Spanish" />
                          <FormControlLabel value="Both" control={<Radio />} label="English & Spanish" />
                        </RadioGroup>
                      </FormControl>
                      <Button variant="contained" color="primary" className="loginButton" type="submit" >Create</Button>
                    </Stack>
                </form>
              </LocalizationProvider>
            </Stack>
        </div>
    )
}

export default CreateTournament