import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import Login from './Login';
import Dictionary from './Dictionary';
import Signup from './Signup';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from "./theme";
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Home from './Home';
import PublicTournaments from './PublicTournaments';
import Tournament from './Tournament';
import CreateTournament from './CreateTournament';
import SubmitResults from './SubmitResults';
import MyTournaments from './MyTournaments';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={customTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/dictionary" element={<PrivateRoute><Dictionary /></PrivateRoute>} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/public-tournaments" element={<PrivateRoute><PublicTournaments /></PrivateRoute>} />
                <Route path="/my-tournaments" element={<PrivateRoute><MyTournaments /></PrivateRoute>} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/create-tournament" element={<PrivateRoute><CreateTournament /></PrivateRoute>} />
                <Route path="/submit-results" element={<PrivateRoute><SubmitResults /></PrivateRoute>} />
                <Route path="/public-tournaments/:tournamentId" element={<PrivateRoute><Tournament /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
    )