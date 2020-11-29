import React from 'react'
import './App.css';
import Main from "./Components/Main";
import {Route} from "react-router-dom";
import Login from "./Login";
import {BrowserRouter} from "react-router-dom";
import {GetCurrentUser} from "./states";
import ReactDOM from "react-dom";
import Modal from "./Components/Modal";
import TaskEdit from "./Components/TaskEdit";
import Header from "./Components/Header";

export default class App extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Router/>

            </BrowserRouter>
        )
    }
}

const Router = () => {
    if (GetCurrentUser().id !== 0) {
        return <Main/>
    } else {
        return <Route path="/" component={Login}/>
    }
}
