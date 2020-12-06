import axios from "axios";

let store = {
    _CurrentUser: {id: 1, login: "Default", password: ""},
    optionDate: [
        {id: 1, name: "Сегодня"},
        {id: 1, name: "Завтра"},
        {id: 2, name: "Неделя"},
        {id: 3, name: "Месяц"},
        {id: 4, name: "Все"}
    ],
    optionSort: [
        {id: 1, name: "Дате начала"},
        {id: 2, name: "Дате окончания"},
        {id: 3, name: "Последнему обновлению"},
        {id: 4, name: "Алфавиту"}
    ],
    dispatch(action) {
        switch (action.type) {
            case 'GET_CURRENT_USER':
                return this._CurrentUser;
            case 'GET_ALL_USERS':
                let users = []
                axios.get(`http://localhost:3001/api/users`)
                    .then(response => {
                        users = response.data.body
                    })
                    .catch(err =>
                        console.log(err.message))
                debugger
                return users;
            case 'ADD_NEW_TASK':
                axios.post(`http://localhost:3001/api/create`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(action.data)
                }).then(response => console.log(response))
                    .catch(err => console.log(err.message))
                break;
            case 'GET_TASKS':
                let state = []
                const r = axios.get(`http://localhost:3001/api/tasks`)
                    .then(response => {
                        state.push(response.data.body)
                    })
                    .catch(err =>
                        console.log(err.message))
                console.log(state)
                debugger
                return state;
            case 'EDIT_TASK':
                this.editTask(action.task)
                break;
            case 'DELETE_TASK':
                this.deleteTask(action.task)
                break;
            default:
                break;
        }
    },
}
export default store