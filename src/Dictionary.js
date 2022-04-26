import { useState } from "react";
import { Button, Fab, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Appbar from "./Appbar";
import searchService from "./services/search"
import authService from "./services/auth"; 

const Dictionary = () => {
    const [ word, setWord ] = useState("")
    const [ searchedWord, setSearchedWord ] = useState("")
    const [ definition, setDefinition ] = useState("")
    const [ language, setLanguage ] = useState("EN")
    const [ errorState, setErrorState ] = useState(false)


    const handleSearch = (event) => {
        event.preventDefault()
        const searchObject = {
            word: word,
            language: language,
        }
        console.log(authService.getHeaders())
        searchService.search(searchObject).then(
            myWord => {
                setErrorState(false)
                setSearchedWord(myWord.name)
                setDefinition(myWord.definition)
            }
          ).catch((error) => {
            setSearchedWord(word)
            console.log(error)
            setErrorState(true)
          })
    }

    const wordChange = (event) => {
        setWord(event.target.value)
      }

    const handleLanguage = (event) => {
        setLanguage(event.target.value);
      }

    const selectedLanguage = () => {
        if(language === "EN"){
            return "English"
        }else{
            return "Spanish"
        }
    }

    return (
        <div>
            <Appbar>

            </Appbar>
            <Stack className="main-stack" >
                <Typography variant="h2" textAlign={"left"}>
                    Dictionary
                </Typography>
                <form className="form" onSubmit={ handleSearch } >
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField id="outlined-search" label={"Search " + selectedLanguage() + " word"} value={ word } 
                                onChange={ wordChange } required={true} error={ errorState } helperText={errorState ? "No results found for " + searchedWord : ""}/>
                            <Button variant="contained" color="primary" className="searchButton" type="submit">
                                <SearchIcon color="#ffffff"/>
                            </Button>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Fab variant="extended" color="secondary" size="small" onClick={ handleLanguage } value="EN">
                                English
                            </Fab>
                            <Fab variant="extended" color="secondary" size="small" onClick={ handleLanguage } value="ES">
                                Spanish
                            </Fab>
                        </Stack>
                        
                        <Typography variant="h4" textAlign={"left"}>
                                {searchedWord}
                        </Typography>
                        <Typography variant="body1" textAlign={"left"}>
                            {definition}
                        </Typography>
                    </Stack>
                </form>
            </Stack>
        </div>
    )
}

export default Dictionary;
