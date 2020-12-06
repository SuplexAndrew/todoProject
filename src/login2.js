import React from 'react'

export class Login2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {login: '', password: ''}
        this.handleChangeLogin = this.handleChangeLogin.bind(this)
        this.handleChangePass = this.handleChangePass.bind(this)
    }

    handleChangeLogin(e) {
        this.setState({login: e.target.value})
    }

    handleChangePass(e) {
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <div className="text-center border-box">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <input placeholder="Login" type='text' value={this.state.login} onChange={this.handleChangeLogin}/>
                <input placeholder="Password" type='text' value={this.state.password} onChange={this.handleChangePass}/>
                <input type='submit' className="btn-primary" value="Sign in"
                       onClick={() => this.props.onLogin({data: this.state})}/>
            </div>
        )
    }
}