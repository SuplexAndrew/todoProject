import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {getSortFunction} from "./CompareFunction";
import {getShowFunction} from "./CompareFunction";
import Task from "./Task/Task";
import TaskEdit from "./TaskEdit/TaskEdit";
import Modal from "./TaskEdit/Modal";
import axios from "axios";


class Main extends React.Component {
    optionShow = [
        {id: 1, name: "Все"},
        {id: 2, name: "Сегодня"},
        {id: 3, name: "Завтра"},
        {id: 4, name: "Неделя"},
        {id: 5, name: "Месяц"},

    ];
    optionSort = [
        {id: 1, name: "Дате начала"},
        {id: 2, name: "Дате окончания"},
        {id: 3, name: "Последнему обновлению"},
        {id: 4, name: "Алфавиту"},
        {id: 5, name: "Приоритету"},
    ];

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('token')),
            showState: 0,
            sortState: 0,
            alltasks: [],
            tasks: [],
            users: [],
            isCreating: false,
            isEditing: false,
            EditingID: 0,
        }
        this.handleChangeOptionShow = this.handleChangeOptionShow.bind(this);
        this.handleChangeOptionSort = this.handleChangeOptionSort.bind(this);
    }

    componentDidMount() {
        axios.post(`http://localhost:3001/api/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: localStorage.getItem('token')
        })
            .then(response => {
                this.setState({tasks: response.data.body, alltasks: response.data.body})
            })
            .catch(err =>
                console.log(err.message))
        axios.get(`http://localhost:3001/api/users`)
            .then(response => {
                this.setState({users: response.data.body})
            })
            .catch(err =>
                console.log(err.message))
    }

    handleChangeOptionShow = (e) => {
        let ss = this.optionShow.find(item => item.name === e.target.value).id
        this.setState({showState: ss});
        let t = this.state.alltasks.filter(getShowFunction(ss))
        t.sort(getSortFunction(this.state.sortState))
        this.setState({tasks: t, showState: ss});
    }
    handleChangeOptionSort = (e) => {
        let ss = this.optionSort.find(item => item.name === e.target.value).id
        let t = this.state.alltasks.filter(getShowFunction(this.state.showState))
        t.sort(getSortFunction(ss))
        this.setState({tasks: t, sortState: ss});
    }
    handleOnClick = () => {
        this.setState({isCreating: this.isCreating = !this.isCreating});
    }
    handleOnSubmit = (props) => {
        if (!props.isCancel) {
            //store.dispatch({action: 'ADD_NEW_TASK', data: props.data})
            axios.post(`http://localhost:3001/api/create`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(props.data)
            }).then(response => console.log(response))
                .catch(err => console.log(err.message))
        }
        this.setState({isCreating: this.isCreating = !this.isCreating});
        this.componentDidMount()
    }
    handleOnEdit = (props) => {
        this.setState({EditingID: props.body.id.toString(), isEditing: this.isEditing = !this.isEditing});
    }
    handleOnSubmitEdit = (props) => {
        if (!props.isCancel) {
            axios.post(`http://localhost:3001/api/edit/${props.data.id}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(props.data)
            }).then(response => console.log(response))
                .catch(err => console.log(err.message))
        }
        this.setState({EditingID: 0, isEditing: this.isEditing = false});
        if (props.isDelete){
            axios.delete(`http://localhost:3001/api/delete/${props.data.id}`)
                .then(response => console.log(response))
                .catch(err => console.log(err.message))
        }
        this.componentDidMount()
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column flex-md-row
                align-items-center  px-md-4  mb-3 bg-white border-bottom mb-3">
                    <label>Отображать на:</label>
                    <select className='mb-2' value={this.state.optionShow} onChange={this.handleChangeOptionShow}>
                        {this.optionShow.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                    </select>
                    <label className='ml-2'>Сортировать по:</label>
                    <select className='mb-2' value={this.state.optionSort} onChange={this.handleChangeOptionSort}>
                        {this.optionSort.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                    </select>
                    {this.state.user.id === this.state.user.leaderid.toString() &&
                    <button className='btn btn-info ml-3 mb-2' onClick={this.handleOnClick}>Создать новую задачу</button>}
                </div>
                {this.isCreating && <Modal>
                    <TaskEdit
                        onClick={this.handleOnSubmit}/>
                </Modal>}
                {this.isEditing &&
                <Modal>
                    <TaskEdit
                        onClick={this.handleOnSubmitEdit}
                        body={this.state.alltasks.find(x => x.id === this.state.EditingID)}
                    />
                </Modal>}
                <div className="mb-3 text-center">
                    {this.state.tasks.map(item =>
                        <Task
                            key={item.id}
                            item={item}
                            isEditable={this.state.user.id === this.state.user.leaderid.toString()}
                            users={this.state.users}
                            onClick={this.handleOnEdit}
                            onStatusClick={this.handleOnSubmitEdit}
                        />)}
                </div>
            </div>
        )
    }
}

export default Main;