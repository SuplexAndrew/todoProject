import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Modal from "./Modal"
import {OnChangeSort} from "../states"
import {OnChangeShow} from "../states"

class Settings extends React.Component {
    optionDate = [
        {id: 1, name: "Сегодня"},
        {id: 2, name: "Неделя"},
        {id: 3, name: "Месяц"},
        {id: 4, name: "Все"}
    ];

    optionSort = [
        {id: 1, name: "Дате начала"},
        {id: 2, name: "Дате окончания"},
        {id: 3, name: "Последнему обновлению"},
        {id: 4, name: "Алфавиту"}
    ];
    state = {
        showModal: false
    }
    //<button onClick={() => this.props.onClick()}>Создать новую задачу</button>
    handleModal = () => {
        this.setState({showModal: !this.state.showModal});
    }
    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center px-md-4  mb-3 bg-white border-bottom ">
                <label>Отображать на:</label>
                <select onChange={(e) => OnChangeShow(e.target.value)}>
                    {this.optionDate.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                </select>
                <label>Сортировать по:</label>
                <select onChange={(e) => OnChangeSort(e.target.value)}>
                    {this.optionSort.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                </select>
                {/* eslint-disable-next-line react/jsx-no-undef */}
                { this.state.showModal && <Modal handleModal={this.handleModal}/> }
                <button onClick={this.handleModal}> Show modal </button>

            </div>
        )
    }
}

export default Settings;