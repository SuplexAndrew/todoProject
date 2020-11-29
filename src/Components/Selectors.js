import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {getSortFunction} from "./CompareFunction";
import {getShowFunction} from "./CompareFunction";
import {OnNewTask, tasks} from "../states"
import Task from "./Task";
import TaskEdit from "./TaskEdit";
import Modal from "./Modal";


class Settings extends React.Component {
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
            tasks: tasks,
            isEdit: false
        }
        this.handleChangeOptionShow = this.handleChangeOptionShow.bind(this);
        this.handleChangeOptionSort = this.handleChangeOptionSort.bind(this);
    }

    handleChangeOptionShow = (e) => {
        let showState = this.optionShow.find(item => item.name === e.target.value).id;
        this.setState({tasks: tasks.filter(getShowFunction(showState))});
    }
    handleChangeOptionSort = (e) => {
        let sortState = this.optionSort.find(item => item.name === e.target.value).id;
        this.setState({tasks: tasks.sort(getSortFunction(sortState))});
    }

    handleOnClick = () => {
        this.setState({isEdit: this.isEdit = !this.isEdit});
    }
    handleOnSubmit = (props) => {
        if (!props.isCancel) {
            OnNewTask(props)
        }
        this.setState({isEdit: this.isEdit = !this.isEdit});
    }
    handleOnEdit = (props) => {

    }

    render() {
        //alert(this.state.optionSort);
        return (
            <div>
                <div className="d-flex flex-column flex-md-row
                align-items-center px-md-4  mb-3 bg-white border-bottom ">
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
                {this.isEdit && <Modal>
                    <TaskEdit onClick={this.handleOnSubmit}/>
                </Modal>}
                <div>
                    {this.state.tasks.map(item =>
                        <Task
                            key={item.id}
                            title={item.title}
                            text={item.text}
                            employee={item.employee}
                            dateStart={item.dateStart}
                            dateEnd={item.dateEnd}
                        />)}
                </div>
            </div>
        )
    }
}

export default Settings;