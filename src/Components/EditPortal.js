import React from 'react'
import ReactDOM from 'react-dom'
import Refresh from "../Refresh";

export class EditPortal extends React.Component {
    el = document.createElement("div");

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        if (this.props.isEdit)
            return ReactDOM.createPortal(this.props.children, this.el)
        else
            return null;
    }
}