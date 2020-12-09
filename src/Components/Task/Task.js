import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import "./Task.css"


const Task = (props) => {
    let empl, cr
    try {
        empl = props.users.find(x => x.id === props.item.employeeid.toString()).login
        cr = props.users.find(x => x.id === props.item.creatorid.toString()).login
    } catch {
        empl = 'empl'
        cr = 'cr'
    }
    let d1 = new Date(props.item.datestart).toLocaleDateString();
    let d2 = new Date(props.item.dateend).toLocaleDateString();
    let d3;
    if (props.item.dateupdate !== null)
        d3 = new Date(props.item.dateupdate).toLocaleDateString();
    else
        d3 = d1
    let color = Date.parse(props.item.dateend) < Date.now() ?
        (props.item.status === 3 ? "text-green" :
            "text-danger") : "text-dark"
    const pr = [
        {id: 1, name: 'Низкий'},
        {id: 2, name: 'Средний'},
        {id: 3, name: 'Высокий'}
    ]
    const st = [
        {id: 1, name: 'Приступить к выполнению'},
        {id: 2, name: 'Закончить выполнение'},
        {id: 3, name: 'Отменить'}
    ]
    const states = [
        {id: 1, name: 'К выполнению'},
        {id: 2, name: 'Выполняется'},
        {id: 3, name: 'Выполнена'},
        {id: 4, name: 'Отменена'}
    ]


    function onStatusClick() {
        let body = props.item
        //body.dateupdate = new Date()
        body.status = props.item.status + 1
        props.onStatusClick({data: body, isCancel: false})
    }

    const [info, setInfo] = useState(false)

    return (
        <div className="main">
            <div className="task">
                <div className="i1">
                    <div className="p0">
                        <h4 className={color}>{props.item.title}</h4>
                    </div>
                    <h5 className="p1">Ответственный: {empl}</h5>
                    <p className="p2">Дата Окончания: {d2}</p>
                    <p className="p3">Приоритет: {pr[props.item.priority - 1].name}</p>
                    <p className="p4">Статус: {states[props.item.status - 1].name}</p>

                </div>
                <div className="i2">.
                    {props.item.status < 3 && !props.isEditable &&
                    <button type="submit" className="btn btn-info"
                            onClick={onStatusClick}>{st[props.item.status - 1].name}</button>}
                    {props.isEditable && <button type="submit" className="btn btn-info"
                                                 onClick={() => props.onClick({body: props.item})}>Изменить</button>}
                </div>
            </div>
            <div>
                <button type="submit" className="btn binfo"
                        onClick={() => setInfo(!info)}>
                </button>
            </div>
            {info &&
            <div className="task">
                <h5>Описание:</h5>
                <p>{props.item.text}</p>
                <p>Дата создания: {d1}</p>
                <p>Дата обновления: {d3}</p>
                <p>Создатель: {cr}</p>
            </div>}
        </div>
    )
}

export default Task;