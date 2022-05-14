import { TextField, Button, Stack } from "@mui/material";
import "./styles.css";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./theme";
import { useState } from "react";
​
const defaultWord = {
  letters: "arbol",
  colors: "nnnnn",
};
​
const HelperGrid = () => {
  const [grid, setGrid] = useState([
    { ...defaultWord },
    { ...defaultWord },
    { ...defaultWord },
    { ...defaultWord },
    { ...defaultWord },
  ]);
​
  const handleWordChange = (word, row) => {
    const newGrid = [...grid];
    newGrid[row].letters = word;
    setGrid(newGrid);
  };
​
  const handleColorChange = (color, row) => {
    const newGrid = [...grid];
    newGrid[row].colors = color;
    setGrid(newGrid);
  };
​
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(grid);
  };
​
  return (
    <ThemeProvider theme={customTheme}>
      <Stack className="stack" spacing={1}>
        {grid.map((word, index) => {
          return (
            <Word
              key={index}
              word={word}
              onWordChange={newWord => handleWordChange(newWord, index)}
              onColorChange={newColor => handleColorChange(newColor, index)}
            />
          )
        })}
        <Button
          variant="contained"
          color="primary"
          className="submitButton"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </ThemeProvider>
  );
};
​
const Word = ({ word, onWordChange, onColorChange }) => {
  const handleWordChange = (e) => {
    const newWord = e.target.value;
    // todo: handle validation
    onWordChange(newWord);
  }
​
  const handleColorChange = (color, index) => {
    const colors = word.colors.split("");
    colors[index] = color;
    onColorChange(colors.join(""));
  }
​
  return (
    <Stack spacing={1}>
      <TextField
        value={word.letters}
        onChange={handleWordChange}
        variant="standard"
        inputProps={{ maxLength: 5 }}
      />
      <Stack direction="row" spacing={1}>
        <CharBox char={word.letters[0]} color={word.colors[0]} onColorChange={(newColor) => handleColorChange(newColor, 0)} />
        <CharBox char={word.letters[1]} color={word.colors[1]} onColorChange={(newColor) => handleColorChange(newColor, 1)} />
        <CharBox char={word.letters[2]} color={word.colors[2]} onColorChange={(newColor) => handleColorChange(newColor, 2)} />
        <CharBox char={word.letters[3]} color={word.colors[3]} onColorChange={(newColor) => handleColorChange(newColor, 3)} />
        <CharBox char={word.letters[4]} color={word.colors[4]} onColorChange={(newColor) => handleColorChange(newColor, 4)} />
      </Stack>
    </Stack>
  );
};
​
const CharBox = ({ char, color, onColorChange }) => {
  const colors = {
    n: 'neutral',
    y: 'secondary',
    g: 'primary',
  }
​
  const handleColorChange = () => {
    if (color === 'n') {
      onColorChange('y');
    } else if (color === 'y') {
      onColorChange('g');
    } else {
      onColorChange('n');
    }
  };
​
  return (
    <div>
      <Button
        variant="contained"
        color={colors[color]}
        onClick={handleColorChange}
        style={{
          maxWidth: "60px",
          maxHeight: "60px",
          minWidth: "60px",
          minHeight: "60px",
        }}
      >
        {char}
      </Button>
    </div>
  );
};
​
export default HelperGrid;