import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./Task.css"

const Task = (props) => {
    let d1 = props.dateStart;
    return (
        <div className="task">
            <div className="bg-light border-dark border-bottom px-md-4 ">
                <h3>{props.title}</h3>
                <h5>Ответственный: {props.employee}</h5>
                <p className="my-2 my-md-0 mr-md-3">{props.text}</p>
                <p className="my-2 my-md-0 mr-md-3">Дата Начала: {d1}</p>
                <p>Дедлайн: {props.dateEnd}</p>
                <button type="submit">Изменить</button>
            </div>
        </div>
    )
}

export default Task;