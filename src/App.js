import './App.css';
import Header from "./components/Header";
import Index from "./components/Index";
import {supabase} from "./database/supabaseClient";
import React, {useState, useEffect} from "react";
import Auth from "./database/Auth";
import {useDispatch, useSelector} from "react-redux";
import * as WINDOWS from './store/windows';

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
            <Header user={session ? session.user ? session.user : null : null} logout={userSignOut} className="headerContainer" />
            <div className="container" style={{padding: '50px 0 100px 0', position: 'relative'}}>
                {!session ? <Auth /> : <Index />}
            </div>
        </div>
    );
}

export default App;
