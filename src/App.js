import React from 'react'
import './App.css';
import Main from "./Components/Main";
import {Route} from "react-router-dom";
import Login from "./Login";
import {BrowserRouter} from "react-router-dom";
import {GetCurrentUser} from "./states";

function App() {
    return (
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    );
}

const Router = () => {
    if(GetCurrentUser().id !== 0){
        return <Main/>
    }
    else {
        return <Route path="/" component={Login}/>
    }
}

export default App;
