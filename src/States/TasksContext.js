import {createContext} from 'react'
import axios from "axios";

function getTasks(props){
    let state = ''
    axios.get(`http://localhost:3001/api/tasks/${props.id}`)
        .then(response => {
            state = ({tasks: response.data.body, alltasks: response.data.body})
        })
        .catch(err =>
            console.log(err.message))
    return state;
}

export const TasksContext = createContext({

})