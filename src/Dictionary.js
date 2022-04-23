import { useState } from "react";
import { Button, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Appbar from "./Appbar";
import searchService from "./services/search"

const Dictionary = () => {
    const [ word, setWord ] = useState("")
    const [ searchedWord, setSearchedWord ] = useState("")
    const [ definition, setDefinition ] = useState("")


    const handleSearch = (event) => {
        event.preventDefault()
        const searchObject = {
            word: word,
            language: "EN",
        }
        searchService.search(searchObject).then(
            myWord => {
                setSearchedWord(myWord.name)
                setDefinition(myWord.definition)
            }
          )
    }

    const wordChange = (event) => {
        setWord(event.target.value)
      }

    return (
        <div>
            <Appbar>

            </Appbar>
            <Stack className="stack" >
                <Typography variant="h2" textAlign={"left"}>
                    Dictionary
                </Typography>
                <form className="form" onSubmit={ handleSearch } >
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField id="outlined-search" label="Search word" value={ word } onChange={ wordChange }/>
                            <Button variant="contained" color="primary" className="searchButton" type="submit">
                                <SearchIcon color="#ffffff"/>
                            </Button>
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
