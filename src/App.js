import React from 'react'
import './App.css';
import Main from "./Components/Main";
import {Route} from "react-router-dom";
import Login from "./Login";
import {BrowserRouter} from "react-router-dom";
import store from "./States/states";
import Header from "./Components/Header";
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tasks: [], isAuthenticated: true}
    }
    render() {
        return (
            <BrowserRouter>
                <Header/>
                <Router tasks={this.state.tasks}/>
            </BrowserRouter>
        )
    }
}

const Router = (props) => {
    if (store.dispatch({type: "GET_CURRENT_USER"}) !== undefined) {
        return <Main tasks={props.tasks}/>
    } else {
        return <Route path="/" component={Login}/>
    }
}

export default App
