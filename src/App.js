import React from 'react'
import './App.css';
import Main from "./Components/Main";
import Header from "./Components/Header";
import axios from 'axios'
import {Login} from "./Components/Login";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: !!localStorage.getItem('token'),
        }
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
                firstname: 'Diana', lastname: 'Markova', patronymic: 'Ivanovna',
                login: 'MarkovaDI', password: '1234', leaderid: 1
            })
        }).then(response => console.log(response))
            .catch(err => console.log(err.message))
            <input type='submit' onClick={this.Create} value='Create'/>
    }*/

    render() {
        return (
            <>
                {this.state.isAuthenticated && <Header/>}
                {!this.state.isAuthenticated && <Login onLogin={this.onLogin}/>}
                {this.state.isAuthenticated && <Main/>}
            </>
        )
    }
}

export default App
