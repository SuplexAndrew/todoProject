import ReactDOM from "react-dom";
import {tasks} from "./states";
import React from "react";
import App from "./App";

let Refresh = () => {
    ReactDOM.render(
        <React.StrictMode>
            <App tasks = {tasks}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
    //ReactDOM.createPortal(<TaskEdit/>, document.getElementById('modal'));
}

export default Refresh;