import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import {setIsCartoons} from '../store/actions';
import {Switch} from '@mui/material';

export default function Header({user, logout, setNotAuth}) {
  const dispatch = useDispatch(); // Получаем диспатч из хука
  const isCartoons = useSelector(state => state).is_cartoons;
  return (

      <AppBar position="static" style={{background: isCartoons ? "#cf1302" : '#5edfff'}}>
        <Toolbar>
          <Switch color="default" onClick={() => {
            dispatch(setIsCartoons(true));
          }}/>
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