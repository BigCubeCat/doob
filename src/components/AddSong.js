import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {addNewTrack} from '../database/methods';
import RateColors from './RateColors';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddSong({open, handleClose}) {
  const [textLink, setTextLink] = React.useState(
      'https://youtu.be/dQw4w9WgXcQ');

  const [title, setTitle] = React.useState('Rickrolled!');
  const [combinations, setCombinations] = React.useState('00');
  const submitRequest = async () => {
    await addNewTrack(title, textLink, combinations);
  }
  return (
      <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
      >
        <AppBar sx={{position: 'relative', backgroundColor: '#2E3B55'}}>
          <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
            >
              <CloseIcon/>
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              Предложить песню
            </Typography>
            <Button autoFocus color="inherit" onClick={() => {
              handleClose();
              submitRequest().catch(console.error)
            }}>
              Отправить
            </Button>
          </Toolbar>
        </AppBar>
        <Divider/>
        <Box
            component="form"
            sx={{
              '& > :not(style)': {m: 1, width: '25ch'},
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column',
            }}
            noValidate
            autoComplete="off"
        >
          <h3 style={{color: '#a3a3a3'}}>Введите ссылку на видео, которые хотели
            бы видеть в нашем приложение.</h3>
          <TextField
              sx={{width: '100%'}} id="title" label="Название"
              variant="outlined"
              value={title}
              onChange={e => setTitle(e.target.value)}
          />
          <TextField
              sx={{width: '100%'}} id="link" label="YouTube-link"
              variant="outlined"
              value={textLink}
              onChange={e => setTextLink(e.target.value)}
          />
          <RateColors buttonScale={0.60} setCombinations={setCombinations} />
        </Box>
      </Dialog>
  );
}
