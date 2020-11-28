import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Settings from "./Selectors";
import Header from "./Header";


const Main = () => {
    return (
        <div>
            <Header/>
            <Settings />
        </div>
    )
}

export default Main;