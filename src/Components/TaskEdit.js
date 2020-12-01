import React from "react";
import "./TaskEdit.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Users} from "../states"

class TaskEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            title: props.title,
            employee: props.employee,
            text: props.text,
            dateStart: props.dateStart,
            dateEnd: props.dateEnd
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

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

    handleSubmit(e) {
        let d2 = this.state.dateEnd
        let d1 = this.state.dateStart
        if (this.state.title !== '' && isNaN(d1) && isNaN(d2) && d2 > d1) {
            this.props.onClick(this.state)
        } else {
            alert("Некорректные данные")
        }
    }

    handleCancel() {
        this.props.onClick({isCancel: true})
    }


    render() {
        return (
            <div className="task-edit">
                <div className="edit-field">
                    <label>Заголовок: </label>
                    <input type="text" value={this.state.title} onChange={this.handleChangeTitle}/>
                </div>
                <div className="edit-field">
                    <label>Ответственный: </label>
                    <select onChange={this.handleChangeEmployee}>
                        {Users.map(item => <option key={item.id} value={item.login}>{item.login}</option>)}
                    </select>
                </div>
                <div className="edit-field">
                    <label>Описание: </label>
                    <input type="text" onChange={this.handleChangeText}/>
                </div>
                <div className="edit-field">
                    <label>Дата начала: </label>
                    <input type="date" value={this.state.dateStart} className="pl-md-4"
                           onChange={this.handleChangeDateStart}/>
                </div>
                <div className="edit-field">
                    <label>Дата окончания: </label>
                    <input type="date" className="pl-md-4" onChange={this.handleChangeDateEnd}/>
                </div>
                <button type="submit" onClick={this.handleSubmit}>Сохранить</button>
                <button type="submit" onClick={this.handleCancel}>Отмена</button>
            </div>
        )
    }
}


export default TaskEdit;