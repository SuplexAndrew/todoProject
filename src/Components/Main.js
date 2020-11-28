import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Settings from "./Selectors";
import Task from "./Task";
import {tasks} from "../states";
import Refresh from "../Refresh";
import {OnNewTask} from "../states"
import TaskEdit from "./TaskEdit";
import Header from "./Header";

let isEdit = false;
const OnClick = () => {
    isEdit = !isEdit;
    Refresh(tasks);
}
const OnSubmit = (props) => {
    OnNewTask(props);
    isEdit = !isEdit;
    Refresh(tasks);
}
const Main = () => {
    return (
        <div>
            <Header/>
            <Settings onClick = {OnClick}/>
            <TaskEdit isEdit = {isEdit} onClick = {OnSubmit}/>
            {tasks.map(item =>
                <Task
                    key={item.id}
                    title={item.title}
                    text={item.text}
                    employee={item.employee}
                    dateStart={item.dateStart}
                    dateEnd={item.dateEnd}
                />)}
        </div>
    )
}

export default Main;