import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import {setIsCartoons} from '../store/actions';

export default function Header({user, logout, setNotAuth}) {
  const dispatch = useDispatch(); // Получаем диспатч из хука
  const isCartoons = useSelector(state => state).is_cartoons;
  return (

      <AppBar position="static" style={{background: '#2E3B55'}}>
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
              onClick={() => {
                dispatch(setIsCartoons(true))} // not matter true or false)
              }
          >
            <img src="/logo.png" height="48px" alt="d(o.o)b"/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            d(o.o)b
          </Typography>
          {
            user ?
                <Button color={'inherit'}
                        onClick={logout}><AccountCircle/></Button>
                :
                <Button color="inherit"
                        onClick={() => setNotAuth(false)}>Войти</Button>
          }
        </Toolbar>
      </AppBar>
  );
}