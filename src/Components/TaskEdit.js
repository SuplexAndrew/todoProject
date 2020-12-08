import React from "react";
import "./TaskEdit.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment'
import axios from "axios";

class TaskEdit extends React.Component {

    constructor(props) {
        super(props);
        if (props.body !== undefined) {
            this.state = {
                id: props.body.id,
                title: props.body.title,
                employeeid: props.body.employeeid,
                text: props.body.text,
                priority: props.body.priority,
                status: props.body.status,
                dateStart: props.body.datestart,
                dateEnd: props.body.dateend,
                dateUpdate: props.body.dateupdate,
                creatorid: props.body.creatorid,
                users: []
            };
        } else {
            this.state = {
                id: '',
                title: '',
                text: '',
                dateStart: '',
                dateEnd: '',
                dateUpdate: Date.now(),
                priority: 2,
                status: 1,
                employeeid: '',
                creatorId: JSON.parse(localStorage.getItem('token')).id,
                users: []
            }

        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangePriority = this.handleChangePriority.bind(this);
        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    componentDidMount() {
        axios.get(`http://localhost:3001/api/users`)
            .then(response => {
                this.setState({users: response.data.body})
            })
            .catch(err =>
                console.log(err.message))
        //this.setState({users:[]})
    }

    handleChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    handleChangeEmployee(e) {
        let id = this.state.users.find(x => x.login === e.target.value).id
        this.setState({employeeid: id});
    }

    handleChangeText(e) {
        this.setState({text: e.target.value});
    }

    handleChangePriority(e) {
        let p;
        switch (e.target.value) {
            case 'Высокий':
                p = 3;
                break;
            case 'Средний':
                p = 2;
                break;
            case 'Низкий':
                p = 1;
                break;
            default:
                break;
        }
        this.setState({priority: p});
    }

    handleChangeDateStart(e) {
        this.setState({dateStart: e.target.value});
    }

    handleChangeDateEnd(e) {
        this.setState({dateEnd: e.target.value});
    }

    handleSubmit() {
        let d2 = this.state.dateEnd
        let d1 = this.state.dateStart
        if (this.state.title !== '' && isNaN(d1) && isNaN(d2) && d2 >= d1) {
            this.props.onClick({data: this.state, isCancel: false})
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
                    <select
                        onChange={this.handleChangeEmployee}>
                        {this.state.users.map
                        (item => <option key={item.id} value={item.login}>{item.login}</option>)}
                    </select>
                </div>
                <div className="edit-field">
                    <label>Описание: </label>
                    <input type="text" value={this.state.text} onChange={this.handleChangeText}/>
                </div>
                <div className="edit-field">
                    <label>Приоритет: </label>
                    <select onChange={this.handleChangePriority}>
                        <option value={'Высокий'}>{'Высокий'}</option>
                        <option value={'Средний'}>{'Средний'}</option>
                        <option value={'Низкий'}>{'Низкий'}</option>
                    </select>
                </div>
                <div className="edit-field">
                    <label>Дата начала: </label>
                    <input type="date" value={moment(new Date(this.state.dateStart)).format('YYYY-MM-DD')}
                           className="pl-md-4"
                           onChange={this.handleChangeDateStart}/>
                </div>
                <div className="edit-field">
                    <label>Дата окончания: </label>
                    <input type="date" value={moment(new Date(this.state.dateEnd)).format('YYYY-MM-DD')}
                           className="pl-md-4"
                           onChange={this.handleChangeDateEnd}/>
                </div>
                <button type="submit" onClick={this.handleSubmit}>Сохранить</button>
                <button type="submit" onClick={this.handleCancel}>Отмена</button>
            </div>
        )
    }
}


export default TaskEdit;