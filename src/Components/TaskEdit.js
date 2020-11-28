import React from "react";
import "./TaskEdit.css"
import 'bootstrap/dist/css/bootstrap.min.css';

class TaskEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: '', employee: '', text: '', dateStart: '', dateEnd: ''};
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);

    }

    handleChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    handleChangeEmployee(e) {
        this.setState({employee: e.target.value});
    }

    handleChangeText(e) {
        this.setState({text: e.target.value});
    }

    handleChangeDateStart(e) {
        this.setState({dateStart: e.target.value});
    }

    handleChangeDateEnd(e) {
        this.setState({dateEnd: e.target.value});
    }


    render() {
        return (
            <div className="task-edit">
                <div className="edit-field">
                    <label>Заголовок: </label>
                    <input type="text" onChange={this.handleChangeTitle}/>
                </div>
                <div className="edit-field">
                    <label>Ответственный: </label>
                    <input type="text" onChange={this.handleChangeEmployee}/>
                </div>
                <div className="edit-field">
                    <label>Описание: </label>
                    <input type="text" onChange={this.handleChangeText}/>
                </div>
                <div className="edit-field">
                    <label>Дата начала: </label>
                    <input type="date" className="pl-md-4" onChange={this.handleChangeDateStart}/>
                </div>
                <div className="edit-field">
                    <label>Дата окончания: </label>
                    <input type="date" className="pl-md-4" onChange={this.handleChangeDateEnd}/>
                </div>
                <button type="submit" onClick={() => this.props.onClick(this.state)}>Сохранить</button>
            </div>
        )
    }
}


export default TaskEdit;