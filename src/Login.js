import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const Login = (props) => {
    const [login, setLoginState] = useState("");
    const [password, setPassState] = useState("");
    return (
        <div className="text-center border-box">
            <form>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Login</label>
                <input type="login" id="inputEmail" className="form-control" placeholder="Login" required=""
                       autoFocus="" value={login} onChange={e => setLoginState(e.target.value)}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                       required="" value={password} onChange={e => setPassState(e.target.value)}/>
                <input className="btn btn-lg btn-primary btn-block" type="submit"
                       onClick={() => props.onLogin({data:{login, password}})} value="sign in"/>
            </form>
        </div>

    );
}

export default Login;