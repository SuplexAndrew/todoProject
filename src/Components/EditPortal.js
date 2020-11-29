import React from 'react'
import ReactDOM from 'react-dom'
import TaskEdit from "./TaskEdit";

//<TaskEdit onSubmit={this.props.onClick}/>
export class EditPortal extends React.Component {
    el = document.getElementById("boo");
    children = <h1>BOOO</h1>
    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        if (this.props.isEdit)
            return ReactDOM.createPortal(this.children, this.el)
        else
            return null;
    }
}