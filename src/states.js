import Refresh from "./Refresh"

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

let _CurrentUser = {id: 3, login: "Default", password: ""};
export const Users = [
    {id: 1, login: "Admin", password: "123"},
    {id: 2, login: "User1", password: "1234"},
]
export const CheckUser = (props) => {
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
            id: tasks.length + 1,
            title: props.title,
            text: props.text,
            employee: props.employee,
            dateStart: props.dateStart,
            dateEnd: props.dateEnd,
            lastEdit: new Date()
        }
    )
}
export const OnEditTask = (props) => {
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
}
