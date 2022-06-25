import Header from "./components/Header";
import {supabase} from "./database/supabaseClient";
import React, {useState, useEffect} from "react";
import Auth from "./database/Auth";
import {useDispatch, useSelector} from "react-redux";
import Player from "./components/Player";
import Playlist from "./components/Playlist";

function App() {
    const [session, setSession] = useState(null)
    const dispatch = useDispatch();
    const currentWindow = useSelector(state => state).window_id;

    const userSignOut = () => {
        supabase.auth.signOut();
    }

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <div className="App">
            <Header user={session ? session.user ? session.user : null : null} logout={userSignOut}/>
            <div className="container" style={{padding: '50px 0 100px 0'}}>
                {!session ? <Auth/> : <Playlist />}
            </div>
        </div>
    );
}

export default App;
