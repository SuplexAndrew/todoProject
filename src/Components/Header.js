import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react'


const Header = () => {
    const v = JSON.parse(localStorage.getItem('token'))
    const onLogout = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }
    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <p className="p-2 text-dark" >{v.login}</p>
            </nav>
            <p className="btn btn-outline-primary"
               onClick={onLogout}>Выйти</p>
        </div>
    )
}

export default Header;