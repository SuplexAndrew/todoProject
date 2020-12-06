import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import "./Task.css"


const Task = (props) => {
    let d1 = new Date(props.item.datestart).toLocaleDateString();
    let d2 = new Date(props.item.dateend).toLocaleDateString();
    let d3;
    if (props.item.dateupdate !== null)
        d3 = new Date(props.item.dateupdate).toLocaleDateString();
    else
        d3 = d1
    let color = Date.parse(props.item.dateend) < Date.now() ? "text-danger" : "text-dark"
    return (
        <div className="task">
            <div className="bg-light border-dark border-bottom px-md-4 ">
                <h3 className={color}>{props.item.title}</h3>
                <h5>Ответственный: {props.item.employeeid}</h5>
                <p className="my-2 my-md-0 mr-md-3">{props.item.text}</p>
                <p className="my-2 my-md-0 mr-md-3">Дата Начала: {d1}</p>
                <p className="my-2 my-md-0 mr-md-3">Дедлайн: {d2}</p>
                <p className="my-2 my-md-0 mr-md-3">Дата обновления: {d3}</p>
                <p className="my-2 my-md-0 mr-md-3">Статус: {props.item.status}</p>
                <p className="my-2 my-md-0 mr-md-3">Приоритет: {props.item.priority}</p>
                <p className="my-2 my-md-0 mr-md-3">Автор: {props.item.creatorId}</p>
                <button type="submit" onClick={() => props.onClick({body: props.item})}>Изменить</button>
            </div>
        </div>
    )
}

export default Task;