import {getSortFunction} from "./Components/CompareFunction";
import {getShowFunction} from "./Components/CompareFunction";
import Refresh from "./Refresh"

let showState;
let sortState;
export let tasks = [
    {
        id: 1,
        title: "XTask1",
        text: "123",
        employee: "Sergey",
        dateStart: Date.parse("2020-10-10"),
        dateEnd: Date.parse("2020-11-30"),
        lastEdit: new Date()
    },
    {
        id: 2,
        title: "DTask2",
        text: "555!",
        employee: "Artem",
        dateStart: Date.parse("2020-10-17"),
        dateEnd: Date.parse("2021-11-5"),
        lastEdit: new Date()
    },
    {
        id: 3,
        title: "ATask3",
        text: "000xxxx",
        employee: "Olga",
        dateStart: Date.parse("2020-10-16"),
        dateEnd: Date.parse("2020-11-30"),
        lastEdit: new Date()
    },
    {
        id: 4,
        title: "AcvTask4",
        text: "0---8",
        employee: "Maksim",
        dateStart: Date.parse("2020-10-20"),
        dateEnd: Date.parse("2020-10-30"),
        lastEdit: new Date()
    },
    {
        id: 5,
        title: "JunTask5",
        text: "0////",
        employee: "Maksim",
        dateStart: Date.parse("2020-10-18"),
        dateEnd: Date.parse("2020-11-4"),
        lastEdit: new Date()
    },
]

let _CurrentUser = {id: 3, login: "", password: ""};
export const Users = [
    {id: 1, login: "Admin", password: "123"},
    {id: 2, login: "User1", password: "1234"},
]
export const CheckUser = (props) => {
    //let  = {login: props.login.toString(), password: props.password.toString()};
    let user = Users.find(user => user.login === props.login && user.password === props.password);
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
}
const LoginUser = (id) => {
    _CurrentUser = Users.find(user => user.id === id);
    Refresh();
}
export const GetCurrentUser = () => {
    return _CurrentUser;
}

export const optionDate = [
    {id: 1, name: "Сегодня"},
    {id: 1, name: "Завтра"},
    {id: 2, name: "Неделя"},
    {id: 3, name: "Месяц"},
    {id: 4, name: "Все"}
];

export const optionSort = [
    {id: 1, name: "Дате начала"},
    {id: 2, name: "Дате окончания"},
    {id: 3, name: "Последнему обновлению"},
    {id: 4, name: "Алфавиту"}
];
export const OnNewTask = (props) => {
    tasks.push(
        {
            id: tasks.length,
            title: props.title,
            text: props.text,
            employee: props.name,
            dateStart: props.dateStart,
            dateEnd: props.dateEnd,
            lastEdit: new Date()
        }
    )
}

export const OnChangeShow = (newState) => {
    showState = optionDate.find(item => item.name === newState).id;
    let v = tasks.filter(getShowFunction(showState));
    alert(v.length);
    Refresh(v);
}


export const OnChangeSort = (newState) => {
    sortState = optionSort.find(item => item.name === newState).id;
    tasks.sort(getSortFunction(sortState));
    alert(sortState);
    Refresh(tasks);
}
