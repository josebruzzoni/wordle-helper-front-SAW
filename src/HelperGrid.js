import { TextField, Button, Stack } from "@mui/material";
import "./styles.css";
import { ThemeProvider } from '@mui/material/styles';
import customTheme from "./theme";

import { useState } from "react";

const CharBox = ({ char }) => {
  const [ colorIndex, setColorIndex ] = useState(0)
  const colors = ["neutral", "secondary", "primary"]

  const changeColor = () => {
    if(colorIndex == 2){
      setColorIndex(0)
    }else{
      setColorIndex(colorIndex + 1)
    }
    
  }

  return (
    <div>
      <Button variant="contained" color={colors.at(colorIndex)} onClick={changeColor} style={{maxWidth: '60px', maxHeight: '60px', minWidth: '60px', minHeight: '60px'}}>
        {char}
      </Button>
    </div>
  )
}

const Word = ({ word }) => {
  const [ newWord, setNewWord ] = useState(word)
  const charArray = newWord.split("")

  const handleWordChange = (event) => {
    setNewWord(event.target.value)
  }

  return (
    <Stack spacing={1}>
      <TextField
          defaultValue="Arbol"
          value={newWord} 
          onChange={handleWordChange}
          variant="standard"
          inputProps={{ maxLength: 5 }}
      />
      <Stack direction="row" spacing={1}>
        <CharBox char={ charArray.at(0) }></CharBox>
        <CharBox char={ charArray.at(1) }></CharBox>
        <CharBox char={ charArray.at(2) }></CharBox>
        <CharBox char={ charArray.at(3) }></CharBox>
        <CharBox char={ charArray.at(4) }></CharBox>
      </Stack>
    </Stack>
  )
}

const HelperGrid = () => {

  const handleSubmit = () => {

  }
  return (
    <ThemeProvider theme={customTheme}>
      <Stack className="stack" spacing={1}>
        <Word word="Arbol"></Word>
        <Word word="Arbol"></Word>
        <Word word="Arbol"></Word>
        <Word word="Arbol"></Word>
        <Word word="Arbol"></Word>
        <Button variant="contained" color="primary" className="submitButton" onClick={ handleSubmit }>Submit</Button>
      </Stack>
    </ThemeProvider>
  )
}

export default HelperGrid;
