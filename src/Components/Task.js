import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./Task.css"


const Task = (props) => {
    let d1 = new Date(props.dateStart).toLocaleDateString();
    let d2 = new Date(props.dateEnd).toLocaleDateString();
    let d3;
    if (props.dateUpdate !== null)
        d3 = new Date(props.dateUpdate).toLocaleDateString();
    else
        d3 = d1
    let color = Date.parse(props.dateEnd) < Date.now() ? "text-danger" : "text-dark"
    return (
        <div className="task">
            <div className="bg-light border-dark border-bottom px-md-4 ">
                <h3 className={color}>{props.title}</h3>
                <h5>Ответственный: {props.employeeId}</h5>
                <p className="my-2 my-md-0 mr-md-3">{props.text}</p>
                <p className="my-2 my-md-0 mr-md-3">Дата Начала: {d1}</p>
                <p className="my-2 my-md-0 mr-md-3">Дедлайн: {d2}</p>
                <p className="my-2 my-md-0 mr-md-3">Дата обновления: {d3}</p>
                <p className="my-2 my-md-0 mr-md-3">Статус: {props.status}</p>
                <p className="my-2 my-md-0 mr-md-3">Приоритет: {props.priority}</p>
                <p className="my-2 my-md-0 mr-md-3">Автор: {props.creatorId}</p>
                <button type="submit" onClick={() => props.onClick({id: props.id})}>Изменить</button>
            </div>
        </div>
    )
}

export default Task;