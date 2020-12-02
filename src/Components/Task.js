import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./Task.css"


const Task = (props) => {
    let d1 = new Date(props.dateStart).toLocaleDateString();
    let d2 = new Date(props.dateEnd).toLocaleDateString();
    let d3 = new Date(props.dateUpdate).toLocaleDateString();
    let color = props.dateEnd < Date.now() ? "text-danger" : "text-dark"
    return (
        <div className="task">
            <div className="bg-light border-dark border-bottom px-md-4 ">
                <h3 className={color}>{props.title}</h3>
                <h5>Ответственный: {props.employee}</h5>
                <p className="my-2 my-md-0 mr-md-3">{props.text}</p>
                <p className="my-2 my-md-0 mr-md-3">Дата Начала: {d1}</p>
                <p>Дедлайн: {d2}</p>
                <p>Дата обновления: {d3}</p>
                <p>Статус: {props.status}</p>
                <p>Приоритет: {props.priority}</p>
                <p>Автор: {props.CreatorId}</p>
                <button type="submit" onClick={() => props.onClick({id: props.id})}>Изменить</button>
            </div>
        </div>
    )
}

export default Task;