import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {getSortFunction} from "./CompareFunction";
import {getShowFunction} from "./CompareFunction";
import {OnEditTask, OnNewTask, tasks} from "../States/states"
import Task from "./Task";
import TaskEdit from "./TaskEdit";
import Modal from "./Modal";
import MD5 from 'cryptojs'


class Main extends React.Component {
    optionShow = [
        {id: 1, name: "Сегодня"},
        {id: 2, name: "Завтра"},
        {id: 3, name: "Неделя"},
        {id: 4, name: "Месяц"},
        {id: 5, name: "Все"}
    ];
    optionSort = [
        {id: 1, name: "Дате начала"},
        {id: 2, name: "Дате окончания"},
        {id: 3, name: "Последнему обновлению"},
        {id: 4, name: "Алфавиту"}
    ];

    constructor(props) {
        super(props);
        this.state = {
            showState: 1,
            sortState: 1,
            tasks: tasks,
            isCreating: false,
            isEditing: false,
            EditingID: 0,
        }
        this.handleChangeOptionShow = this.handleChangeOptionShow.bind(this);
        this.handleChangeOptionSort = this.handleChangeOptionSort.bind(this);
    }

    handleChangeOptionShow = (e) => {
        let ss = this.optionShow.find(item => item.name === e.target.value).id
        this.setState({showState: ss});
        let t = tasks.filter(getShowFunction(ss))
        t.sort(getSortFunction(this.state.sortState))
        this.setState({tasks: t, showState: ss});
    }
    handleChangeOptionSort = (e) => {
        let ss = this.optionSort.find(item => item.name === e.target.value).id
        let t = tasks.filter(getShowFunction(this.state.showState))
        t.sort(getSortFunction(ss))
        //debugger
        this.setState({tasks: t, sortState: ss});
    }

    handleOnClick = () => {
        this.setState({isCreating: this.isCreating = !this.isCreating});
    }
    handleOnSubmit = (props) => {
        if (!props.isCancel) {
            OnNewTask(props)
        }
        this.setState({isCreating: this.isCreating = !this.isCreating});
    }
    handleOnEdit = (props) => {
        this.setState({EditingID: props.id, isEditing: this.isEditing = !this.isEditing});
    }
    handleOnSubmitEdit = (props) => {
        if (!props.isCancel) {
            OnEditTask(props)
            debugger;
            this.setState({tasks: tasks})
            alert(this.state.tasks[1].title)
        }
        this.setState({EditingID: 0, isEditing: this.isEditing = !this.isEditing});
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-column flex-md-row
                align-items-center px-md-4  mb-3 bg-white border-bottom ">
                    <label>{MD5("password")}</label>
                    <label>Отображать на:</label>
                    <select value={this.state.optionShow} onChange={this.handleChangeOptionShow}>
                        {this.optionShow.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                    </select>
                    <label>Сортировать по:</label>
                    <select value={this.state.optionSort} onChange={this.handleChangeOptionSort}>
                        {this.optionSort.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                    </select>
                    <button onClick={this.handleOnClick}>Создать новую задачу</button>
                </div>
                {this.isCreating && <Modal>
                    <TaskEdit onClick={this.handleOnSubmit}/>
                </Modal>}
                {this.isEditing &&
                <Modal>
                    <TaskEdit
                        onClick={this.handleOnSubmitEdit}
                        id={this.state.EditingID}
                        title={tasks[1].title}
                        employee={tasks[1].employee}
                        text={tasks[1].text}
                        dateStart={tasks[1].dateStart}
                        dateEnd={tasks[1].dateEnd}
                    />
                </Modal>}
                <div>
                    {this.state.tasks.map(item =>
                        <Task
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            text={item.text}
                            employee={item.employee}
                            dateStart={item.dateStart}
                            dateEnd={item.dateEnd}
                            onClick={this.handleOnEdit}
                        />)}
                </div>
            </div>
        )
    }
}

export default Main;