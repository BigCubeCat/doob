import Header from './components/Header';
import Index from './components/Index';
import {supabase} from './database/supabaseClient';
import React, {useState, useEffect} from 'react';
import Auth from './database/Auth';
import {useDispatch, useSelector} from 'react-redux';

function App() {
  const [session, setSession] = useState(null);
  const dispatch = useDispatch();
  const currentWindow = useSelector(state => state).window_id;
  const [notAuth, setNotAuth] = useState(false);

  const userSignOut = () => {
    supabase.auth.signOut();
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
      <div className="App">
        <Header user={session ? session.user ? session.user : null : null}
                logout={userSignOut}/>
        <div className="Container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {
            (!session && !notAuth) ? <Auth setNotAuth={setNotAuth}/> : <Index/>
          }
        </div>
      </div>
  );
}

export default App;
