import React from "react";

class TaskEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: '', employee: '', text: '', dateStart: '', dateEnd: ''};
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeEmployee = this.handleChangeEmployee.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this);
    }

    handleChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    handleChangeEmployee(e) {
        this.setState({employee: e.target.value});
    }

    handleChangeText(e) {
        this.setState({text: e.target.value});
    }

    handleChangeDateStart(e) {
        this.setState({dateStart: e.target.value});
    }

    handleChangeDateEnd(e) {
        this.setState({dateEnd: e.target.value});
    }

    render() {
        if (this.props.isEdit)
            return (
                <div className="bg-light">
                    <label>Заголовок: </label>
                    <input type="text" onChange={this.handleChangeTitle}/>
                    <label>Ответственный: </label>
                    <input type="text" onChange={this.handleChangeEmployee}/>
                    <label>Описание: </label>
                    <input type="text" onChange={this.handleChangeText}/>
                    <label>Дата начала: </label>
                    <input type="calendar" onChange={this.handleChangeDateStart}/>
                    <label>Дата окончания: </label>
                    <input type="calendar" onChange={this.handleChangeDateEnd}/>
                    <button type="submit" onClick={() => this.props.onClick(this.state)}>Сохранить</button>
                </div>
            )
        else
            return <div/>
    }
}

export default TaskEdit;