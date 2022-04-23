import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Login from './Login';
import Dictionary from './Dictionary';
import Signup from './Signup';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from "./theme";

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={customTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/dictionary" element={<Dictionary />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
    )