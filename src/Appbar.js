import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsOutlined';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjectsOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from "./Wordle Helper logo-03.svg"
import logoutService from "./services/auth"
import { Link, useNavigate } from "react-router-dom"

const Appbar = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [ drawerOpened, setDrawerOpened ] = useState(false)

    const navigate = useNavigate()

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logoutService.logout()
        navigate("/login")
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setDrawerOpened(open);
      };

    const handleMenuButton = (path) => {
        navigate(path)
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="white"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={drawerOpened} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: 250 }}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}>
                            <List subheader={<ListSubheader>Hi, {sessionStorage.getItem("username")}</ListSubheader>}>
                                <ListItem button key="Helper">
                                    <ListItemIcon><EmojiObjectsIcon color="primary" /></ListItemIcon>
                                    <ListItemText primary="Helper" />
                                </ListItem>
                                <ListItem button key="Dictionary" onClick={() => handleMenuButton("/dictionary")}>
                                    <ListItemIcon><MenuBookIcon color="primary" /></ListItemIcon>
                                    <ListItemText primary="Dictionary" />
                                </ListItem>
                                <ListItem button key="Tournaments">
                                    <ListItemIcon><EmojiEventsIcon color="primary" /></ListItemIcon>
                                    <ListItemText primary="Tournaments" />
                                </ListItem>
                            </List>
                            <Divider />
                        </Box>
                    </Drawer>
                    <Typography component="div" sx={{ flexGrow: 1, textAlign: "center"}}>
                        <Link to="/home"><img src={logo} alt="logo" width="150"/></Link>
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="white"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Appbar;
