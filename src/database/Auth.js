import {useState} from 'react';
import {supabase} from './supabaseClient';
import * as React from 'react';
import {
  Avatar,
} from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

export default function Auth({setNotAuth}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isGuest, setIsGuest] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (isGuest) {
      setNotAuth(true);
      return;
    }

    try {
      setLoading(true);
      const {error} = await supabase.auth.signIn({email});
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          {loading ? (
                  <h2>Ссылка для входа отправлена на почту!</h2>
              ) :
              <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
              >
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                  <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Вход
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate
                     sx={{mt: 1}}>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={e => setEmail(e.target.value)}
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{mt: 3, mb: 1, bgcolor: 'primary.main'}}
                  >
                    Войти
                  </Button>
                  <p>или</p>
                  <Button
                      onClick={() => setIsGuest(true)}
                      type="submit"
                      fullWidth
                      sx={{mt: 1, mb: 2}}
                  >
                    Зайти гостем
                  </Button></Box>
              </Box>
          }
        </Container>
      </ThemeProvider>
  );
}