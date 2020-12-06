import React from 'react'
import './App.css';
import Main from "./Components/Main";

import Header from "./Components/Header";
import axios from 'axios'
import {Login2} from "./login2";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: !!localStorage.getItem('token'),
            token: '',
            user: {id: '', firstname: '', lastname: '', patronymic: '', login: ''},
        }
        //добавить токен и сохранение юзера
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin = (props) => {
        const body = {login: props.data.login, pass: props.data.password}
        axios.post('http://localhost:3001/api/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }).then(response => {
            localStorage.setItem('token', JSON.stringify(response.data.user))
            this.setState({
                user: response.data.user,
                isAuthenticated: !!localStorage.getItem('token')
            })
        })
            .catch(err => err.message.split(' ')[5] === '500' ? alert('Неверный логин') : alert('Неверный пароль'))
    }

    /*Create = () => {
        axios.post('http://localhost:3001/api/login/create', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                firstname: 'Alexander', lastname: 'Yashin', patronymic: 'Yurievich',
                login: 'YashinAY', password: '1234', isleader: false
            })
        }).then(response => console.log(response))
            .catch(err => console.log(err.message))
    }*/

    render() {
        return (
            <>
                {this.state.isAuthenticated && <Header user={this.state.user}/>}
                {!this.state.isAuthenticated && <Login2 onLogin={this.onLogin}/>}
                {this.state.isAuthenticated && <Main user={this.state.user}/>}
            </>
        )
    }
}

export default App
