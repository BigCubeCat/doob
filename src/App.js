import Header from './components/Header';
import Index from './components/Index';
import {supabase} from './database/supabaseClient';
import React, {useState, useEffect} from 'react';
import Auth from './database/Auth';
import {useSelector} from 'react-redux';
import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddSong from './components/AddSong';

function App() {
  const isCartoons = useSelector(state => state).is_cartoons;
  const [session, setSession] = useState(null);
  const [notAuth, setNotAuth] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userSignOut = () => {
    supabase.auth.signOut();
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const songDialog = <AddSong open={open} handleClose={handleClose}/>;

  if (open) {
    return songDialog;
  }
  // #e6e8fc #2E3B55
  return (
      <div className="App"
           style={{
             background: `linear-gradient(to bottom,  white 0%, ${isCartoons ?
                 'white' :
                 'white'} 70%, white 100%`,
           }}>
        <Header
            user={session ? session.user : null}
            logout={userSignOut}
            setNotAuth={setNotAuth}
            isAuthWindow={!session && !notAuth}
        />
        <div className="Container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {
            (!session && !notAuth) ?
                <Auth setNotAuth={setNotAuth}/> :
                <Index user={session ? session.user : undefined}/>
          }
          {session ?
              <Fab
                  onClick={() => setOpen(true)}
                  sx={{
                    position: 'absolute',
                    bottom: 30,
                    right: 30,
                  }} aria-label="Предложить"
                  color={['warning', 'success', 'primary', 'error'][Math.floor(
                      Math.random() *
                      4)]}>
                <AddIcon/>
              </Fab> : null
          }
        </div>
      </div>
  );
}

export default App;
