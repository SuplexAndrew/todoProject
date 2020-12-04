const express = require('express')
const app = express()
const port = 3001

//const pool = require('./db')
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: '123',
    port: 5432,
});
//const TaskModel = require('../Models/TaskModel')
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/api', async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM tasks'
        const tasks = await pool.query(selectQuery)
        const t = tasks.rows.map(task =>
            console.log(task))
        res.status(200).send({body: tasks.rows})
    } catch (e) {
        res.status(500).send('err0r')
    }
})
app.post('/api/create', async (req, res) => {
    try {
        const insertQuery =
            'INSERT INTO tasks (title, text, dateStart, dateEnd, dateUpdate, priority, status, CreatorId, EmployeeId) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'
        const {id, title, text, dateStart, dateEnd, dateUpdate, priority, status, creatorId, employeeId}
            = JSON.parse(req.body.body)

        let ds = new Date(dateStart)
        let de = new Date(dateEnd)
        let du = new Date(dateUpdate)
        const newTodo = await pool.query(insertQuery,
            [title, text, ds, de, du,
                priority, status, creatorId, employeeId])
        res.status(200).send({body: newTodo})
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e.message)
    }
})
app.post('/api/edit/:id', async (req, res) => {
    try {
        const {id, title, text, dateStart, dateEnd, dateUpdate, priority, status, creatorId, employeeId}
            = JSON.parse(req.body.body)

        const editQuery = 'UPDATE tasks SET title = $2, text = $3, datestart = $4, dateend = $5, dateupdate = $6,' +
            'priority = $7, status = $8, creatorid = $9, employeeid = $10 where id = $1'
        const newTodo = await pool.query(editQuery,
            [id, title, text, dateStart, dateEnd, dateUpdate, priority, status, creatorId, employeeId])
        console.log(newTodo)
        res.status(200).send({body: newTodo})
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e.message)
    }
})
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const {id} = JSON.parse(req.body.body)
        const editQuery =
            `DELETE FROM tasks where id = ${id}`
        const newTodo = await pool.query(editQuery)
        res.status(200).send({body: newTodo})
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e.message)
    }
})
app.get('/api/users', async (req, res) => {
    try {
        const selectQuery = 'SELECT lastname FROM users'
        const users = await pool.query(selectQuery)
        const t = users.rows.map(task =>
            console.log(task))
        res.status(200).send({body: users.rows})
    } catch (e) {
        res.status(500).send('err0r')
    }
})
app.get('/api/users', async (req, res) => {
    try {
        const selectQuery = 'SELECT lastname FROM users'
        const users = await pool.query(selectQuery)
        const t = users.rows.map(task =>
            console.log(task))
        res.status(200).send({body: users.rows})
    } catch (e) {
        res.status(500).send('err0r')
    }
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})