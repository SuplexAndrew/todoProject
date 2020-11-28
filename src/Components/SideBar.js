import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBarItem = (props) => {
    return(
        <li className="nav-item">
            {props.name}
        </li>
    )
}

const SideBar = () => {
    const items1 = [
        {id:1, name: "Текущие задачи"},
        {id:2, name: "Сотрудники"},
        {id:3, name: "Текущие задачи"}
    ]
    return(
        <div className="navbar">
            <ul>
                {items1.map(item => <SideBarItem key={item.id} name={item.name}/>)}
            </ul>
        </div>
    )
}
export default SideBar;