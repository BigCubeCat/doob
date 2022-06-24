import './App.css';
import Header from "./components/Header";
import {supabase} from "./database/supabaseClient";
import React, {useState, useEffect} from "react";
import Auth from "./database/Auth";

function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <div className="App">
            <Header user={session.user}/>
            <div className="container" style={{ padding: '50px 0 100px 0' }}>
                {!session ? <Auth /> : <div>Welcome!</div> }
            </div>
        </div>
    );
}

export default App;
