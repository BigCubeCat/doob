import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';


export default function Header({user, logout}) {
    return (

        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <img src='/logo.png' height='48px' alt="d(o.o)b"/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    d(o.o)b
                </Typography>
                {
                    user ?
                        <Button color={'inherit'} onClick={logout}><AccountCircle/></Button>
                        : <Button color="inherit">Login</Button>
                }
            </Toolbar>
        </AppBar>
    );
}