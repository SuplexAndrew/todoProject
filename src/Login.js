import {CheckUser} from "./states"
import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const Login = () => {
    const [loginState, setLoginState] = useState("");
    const [passState, setPassState] = useState("");
    return (
        <div className="text-center border-box">
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Login</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                       autoFocus="" value={loginState} onChange={e => setLoginState(e.target.value)}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                       required="" value={passState} onChange={e => setPassState(e.target.value)}/>
                <button className="btn btn-lg btn-primary btn-block" type="submit" value="login"
                        onClick={() =>
                            CheckUser({login: loginState, password: passState})}>Sign in
                </button>
            </form>
        </div>

    );
}

export default Login;