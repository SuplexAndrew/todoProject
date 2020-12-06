import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'

const Header = () => {
    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <p className="p-2 text-dark" >{'text'}</p>
            </nav>
            <p className="btn btn-outline-primary"
               onClick={() => localStorage.removeItem('token')}>Выйти</p>
        </div>
    )
}

export default Header;