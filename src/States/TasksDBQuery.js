import React, {useState, useEffect} from 'react';

function App() {
    const [tasks, setTasks] = useState(false);
    useEffect(() => {
        getTask();
    }, []);

    function getTask() {
        fetch('http://localhost:3001')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setTasks(data);
            });
    }

    function createTask(props) {
        let title = props.title;
        let text = props.text;
        let dateStart = props.dateStart
        let dateEnd = props.dateEnd
        let dateUpdate = props.dateUpdate
        let priority = props.priority
        let status = props.status
        let CreatorId = props.creatorId
        let EmployeeId = props.employeeId
        fetch('http://localhost:3001/Create', {
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
            .then(data => {
                alert(data);
                getTask();
            });
    }

    function editTask(props) {
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
            .then(data => {
                alert(data);
                getTask();
            });
    }

    function deleteTask(props) {
        let id = props.id;
        fetch(`http://localhost:3001/delete/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getTask();
            });
    }
}

export default App;