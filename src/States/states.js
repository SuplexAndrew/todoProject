import axios from "axios";

let store = {

    Users: [
        {id: 1, login: "Admin", password: "123"},
        {id: 2, login: "User1", password: "1234"},
    ],

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
            case 'ADD_NEW_TASK':
                debugger
                axios.post(`http://localhost:3001/api/create`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(action.data)
                }).then(response => console.log(response))
                    .catch(err => console.log(err.message))
                debugger
                break;
            case 'GET_TASKS':
                //return this._tasks
                return this.getTasks()
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
    getUsers() {
        return this.Users;
    },
    createTask(props) {
        let title = props.title;
        let text = props.text;
        let dateStart = props.dateStart
        let dateEnd = props.dateEnd
        let dateUpdate = props.dateUpdate
        let priority = props.priority
        let status = props.status
        let CreatorId = props.creatorId
        let EmployeeId = props.employeeId
        fetch('http://localhost:3000/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                text,
                dateStart,
                dateEnd,
                dateUpdate,
                priority,
                status,
                CreatorId,
                EmployeeId
            }),
        })
            .then(response => {
                return response.text();
            })
        this.getTasks();
    },

    getTasks() {
        const response = axios.get(`http://localhost:3001/api`);
        console.log(response.data);
        console.log(response.body);
        return response.body;
    },
    editTask(props) {
        let title = props.title;
        let text = props.text;
        let dateStart = props.dateStart
        let dateEnd = props.dateEnd
        let dateUpdate = props.dateUpdate
        let priority = props.priority
        let status = props.status
        let CreatorId = props.creatorId
        let EmployeeId = props.employeeId
        fetch('http://localhost:3001/Edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title, text,
                dateStart,
                dateEnd,
                dateUpdate,
                priority,
                status,
                CreatorId,
                EmployeeId
            }),
        })
            .then(response => {
                return response.text();
            })
        this.getTasks()
    },
    deleteTask(props) {
        let id = props.id;
        fetch(`http://localhost:3001/delete/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
        this.getTasks();
    },
    getUser() {
        fetch('http://localhost:3000/Login')
            .then(response => {
                return response.text();
            })
            .then(data => {
                this._CurrentUser = data;
            });
    },
    getTaskById(id) {
        return this._tasks.find(x => x.id === id);
    }
}
export default store
/*CheckUser(props){
    let user = this.Users.find(user => user.login === props.login && user.password === props.password);
    let b = user !== undefined;
    if (b)
        LoginUser(user.id);
    else {
        if (Users.find(user => user.login === props.login && user.password !== props.password) !== undefined) {
            alert("Неправильный пароль");
        } else {
            alert("Такого пользователя не существует");
        }
    }
    return b;
},
LoginUser:(id) => {
    _CurrentUser = Users.find(user => user.id === id)
},
GetCurrentUser:() => {
    return _CurrentUser;
},


OnNewTask:(props) => {
    tasks.push(
        {
            id: tasks.length + 1,
            title: props.title,
            text: props.text,
            employee: props.employee,
            dateStart: props.dateStart,
            dateEnd: props.dateEnd,
            lastEdit: new Date()
        }
    )
},
OnEditTask :(props) => {
    tasks[props.id] =
        {
            id: props.id,
            title: props.title,
            text: props.text,
            employee: props.employee,
            dateStart: props.dateStart,
            dateEnd: props.dateEnd,
            lastEdit: new Date()
        }
}*/
