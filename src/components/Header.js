import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {useDispatch, useSelector} from 'react-redux';
import {setIsCartoons} from '../store/actions';
import {alpha, styled} from '@mui/material/styles';
import {Switch} from '@mui/material';
import { pink, grey } from '@mui/material/colors';

const WhiteSwitch = styled(Switch)(({theme}) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: grey[400],
    '&:hover': {
      backgroundColor: alpha(grey[400], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: grey[640],
  },
}));
export default function Header({user, logout, setNotAuth, isAuthWindow}) {
  const dispatch = useDispatch(); // Получаем диспатч из хука
  const isCartoons = useSelector(state => state).is_cartoons;
  let rightButton;
  if (!isAuthWindow) {
    rightButton = (user) ?
        <Button color={'inherit'}
                onClick={logout}><AccountCircle/></Button> :
        <Button color="inherit"
                onClick={() => setNotAuth(false)}>Войти</Button>;
  }
  return (
      <AppBar position="static"
              style={{
                background: isAuthWindow ? 'black' : (isCartoons
                    ? '#ffbf00'
                    : 'black'),
              }}>
        <Toolbar>
          {isAuthWindow ? null :<WhiteSwitch color="info" checked={!isCartoons} onClick={() => {
            dispatch(setIsCartoons(true));
          }}/>}
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            d(o.o)b {isCartoons ? 'Kids' : null}
          </Typography>
          {rightButton}
        </Toolbar>
      </AppBar>);
}