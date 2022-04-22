import { TextField, Button, Stack } from "@mui/material";
import "./styles.css";
import { ThemeProvider } from '@mui/material/styles';
import customTheme from "./theme";
import HelperGrid from "./HelperGrid";
import { ReactComponent as Logo } from "./Wordle Helper logo-03.svg"

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Stack className="stack">
        <Logo />
        <form className="form">
          <TextField variant="standard" label="Username" />
          <TextField variant="standard" type="password" label="Password" />
          <Button variant="contained" color="primary" className="loginButton">Log in</Button>
        </form>
      </Stack>
    </ThemeProvider>
    /*<HelperGrid>
      
    </HelperGrid>*/
  )
}

export default App;
