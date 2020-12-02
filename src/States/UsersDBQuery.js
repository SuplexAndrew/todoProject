import React, {useState, useEffect} from 'react';

function App() {
    const [users, setUsers] = useState(false);
    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        fetch('http://localhost:3001/user')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setUsers(data);
            });
    }
}