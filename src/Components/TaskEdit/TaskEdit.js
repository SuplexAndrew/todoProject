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
                datestart: props.body.datestart,
                dateend: props.body.dateend,
                dateupdate: props.body.dateupdate,
                creatorid: props.body.creatorid,
                users: []
            };
        } else {
            this.state = {
                id: '',
                title: '',
                text: '',
                datestart: Date.now(),
                dateend: Date.now(),
                dateupdate: Date.now(),
                priority: 3,
                status: 1,
                employeeid: 1,
                creatorid: JSON.parse(localStorage.getItem('token')).id,
                users: []
            }

        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangePriority = this.handleChangePriority.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/api/users`)
            .then(response => {
                this.setState({users: response.data.body})
            })
            .catch(err =>
                console.log(err.message))
    }

    handleChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    handleChangeEmployee(e) {
        let i = this.state.users.find(x => x.login === e.target.value).id
        this.setState({employeeid: i});
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

    handleChangeStatus(e) {
        let p;
        switch (e.target.value) {
            case 'К выполнению':
                p = 1;
                break;
            case 'Выполняется':
                p = 2;
                break;
            case 'Выполнена':
                p = 3;
                break;
            case 'Отменена':
                p = 4;
                break;
            default:
                break;
        }
        this.setState({status: p});
    }

    handleChangeDateStart(e) {
        this.setState({datestart: e.target.value});
    }

    handleChangeDateEnd(e) {
        this.setState({dateend: e.target.value});
    }

    handleSubmit() {
        let d2 = this.state.dateend
        let d1 = this.state.datestart
        if (this.state.title !== '' && !isNaN(d1) && !isNaN(d2) && d2 >= d1) {
            this.props.onClick({data: this.state, isCancel: false})
        } else {
            alert("Некорректные данные")
        }
    }

    handleCancel() {
        this.props.onClick({isCancel: true})
    }

    handleDelete() {
        this.props.onClick({data: this.state, isDelete: true, isCancel: true})
    }


    render() {
        return (
            <div className="task-edit">
                <div className="edit-field">
                    <label>Заголовок: </label>
                    <input className="select1" type="text" value={this.state.title} onChange={this.handleChangeTitle}/>
                </div>
                <div className="edit-field">
                    <label>Ответственный: </label>
                    <select className="select1"
                            onChange={this.handleChangeEmployee}>
                        {this.state.users.map
                        (item => <option key={item.id} value={item.login}>{item.login}</option>)}
                    </select>
                </div>
                <div className="edit-field">
                    <label>Описание: </label>
                    <input className="select1" type="text" value={this.state.text} onChange={this.handleChangeText}/>
                </div>
                <div className="edit-field">
                    <label>Приоритет: </label>
                    <select className="select1" onChange={this.handleChangePriority}>
                        <option value={'Высокий'}>{'Высокий'}</option>
                        <option value={'Средний'}>{'Средний'}</option>
                        <option value={'Низкий'}>{'Низкий'}</option>
                    </select>
                </div>
                <div className="edit-field">
                    <label>Статус: </label>
                    <select className="select1" onChange={this.handleChangeStatus}>
                        <option value={'К выполнению'}>{'К выполнению'}</option>
                        <option value={'Выполняется'}>{'Выполняется'}</option>
                        <option value={'Выполнена'}>{'Выполнена'}</option>
                        <option value={'Отменена'}>{'Отменена'}</option>
                    </select>
                </div>
                <div className="edit-field">
                    <label>Дата начала: </label>
                    <input type="date" className="select1"
                           value={moment(new Date(this.state.datestart)).format('YYYY-MM-DD')}
                           onChange={this.handleChangeDateStart}/>
                </div>
                <div className="edit-field">
                    <label className="a1">Дата окончания: </label>
                    <input type="date" value={moment(new Date(this.state.dateend)).format('YYYY-MM-DD')}
                           className="select1"
                           onChange={this.handleChangeDateEnd}/>
                </div>
                <div className='mt-2 ml-3'>
                    <button type="submit" className="btn-primary" onClick={this.handleSubmit}>Сохранить</button>
                    <button type="submit" className="btn-group ml-1 mb-1" onClick={this.handleCancel}>Отмена</button>
                    {this.props.body !== undefined &&
                    <button type="submit" className="btn-danger float-right mr-3"
                            onClick={this.handleDelete}>Удалить</button>}
                </div>
            </div>
        )
    }
}


export default TaskEdit;