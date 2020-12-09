const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const port = 3001

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: '123',
    port: 5432,
});
app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.post('/api/tasks', async (req, res) => {
    try {
        const user = JSON.parse(req.body.body)
        /*const selectQuery = user.id.toString() !== user.leaderid.toString() ?
            'SELECT tasks.id, title, text, datestart, dateend, dateupdate, priority, status, u.login as employee, c.login as creator ' +
            'FROM tasks ' +
            'JOIN users u ON u.id = tasks.employeeid ' +
            'JOIN users c ON c.id = tasks.creatorid ' +
            'WHERE employeeid = $1'
            :
            'SELECT tasks.id, title, text, datestart, dateend, dateupdate, priority, status, u.login as employee, c.login as creator ' +
            'FROM tasks ' +
            'JOIN users u ON u.id = tasks.employeeid ' +
            'JOIN users c ON c.id = tasks.creatorid ' +
            'WHERE creatorid = $1 '
*/
        const selectQuery = user.id.toString() !== user.leaderid.toString() ?
            'SELECT tasks.id, title, text, datestart, dateend, dateupdate, priority, status, employeeid, creatorid ' +
            'FROM tasks ' +
            'WHERE employeeid = $1'
            :
            'SELECT tasks.id, title, text, datestart, dateend, dateupdate, priority, status, employeeid, creatorid ' +
            'FROM tasks ' +
            'WHERE creatorid = $1 '
        const tasks = await pool.query(selectQuery, [user.id])
        res.status(200).send({body: tasks.rows})
    } catch (e) {
        console.log(e.message)
        res.status(500).send('err0r')
    }
})
app.post('/api/create', async (req, res) => {
    try {
        const insertQuery =
            'INSERT INTO tasks (title, text, datestart, dateend, dateupdate, priority, status, creatorid, employeeid) ' +
            'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *'
        const {title, text, datestart, dateend, dateupdate, priority, status, creatorid, employeeid}
            = JSON.parse(req.body.body)
        const newTodo = await pool.query(insertQuery,
            [title, text, new Date(datestart), new Date(dateend), new Date(dateupdate),
                priority, status, creatorid, employeeid])
        res.status(200).send({body: newTodo})
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e.message)
    }
})
app.post('/api/edit/:id', async (req, res) => {
    try {
        const {id, title, text, datestart, dateend, dateupdate, priority, status, creatorid, employeeid}
            = JSON.parse(req.body.body)
        datestart.setDate(datestart.getDate() + 1)
        dateend.setDate(dateend.getDate() + 1)
        dateupdate.setDate(dateupdate.getDate() + 1)
        const editQuery = 'UPDATE tasks SET title = $2, text = $3, datestart = $4, dateend = $5, dateupdate = $6,' +
            'priority = $7, status = $8, creatorid = $9, employeeid = $10 where id = $1'
        const newTodo = await pool.query(editQuery,
            [id, title, text, datestart, dateend, dateupdate, priority, status, creatorid, employeeid])
        res.status(200).send({body: newTodo})
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e.message)
    }
})
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const editQuery = 'DELETE FROM tasks where id = $1'
        const newTodo = await pool.query(editQuery, [id])
        res.status(200).send({body: newTodo})
    } catch (e) {
        res.status(500).send(e.message)
        console.log(e.message)
    }
})
app.get('/api/users', async (req, res) => {
    try {
        const selectQuery = 'SELECT id, lastname, login FROM users'
        const users = await pool.query(selectQuery)
        res.status(200).send({body: users.rows})
    } catch (e) {
        res.status(500).send('err0r')
    }
})
app.post('/api/login', async (req, res) => {
    try {
        const {login, pass} = JSON.parse(req.body.body)
        let output = await pool.query('SELECT id, firstname, lastname, patronymic, password, salt, leaderid' +
                ' FROM users WHERE login = $1', [login])
        const {id, firstname, lastname, patronymic, password, salt, leaderid} = output.rows[0]
        if (pass === null)
            res.status(404).send('user not found')
        else {
            let isMatch = await bcrypt.hash(pass, salt) === (password)
            if (isMatch)
                res.status(200).send({user: {id, firstname, lastname, patronymic, login, leaderid}})
            else{
                console.log('wrong password')
                res.status(400).send('wrong password')
            }
        }
    } catch (e) {
        console.log(e.message)
        res.status(500).send('err0r')
    }
})
app.post('/api/login/create', async (req, res) => {
    try {
        const {firstname, lastname, patronymic, login, password, leaderid} = JSON.parse(req.body.body)
        const salt = await bcrypt.genSalt(5, 'a')
        const pass = await bcrypt.hash(password, salt)
        let result = await pool.query('INSERT INTO users (firstname, lastname, patronymic, login, password, salt, leaderid)' +
            'Values ($1, $2, $3, $4, $5, $6, $7);',
            [firstname, lastname, patronymic, login, pass, salt, leaderid])
        if (result)
            res.status(201).send('user added')
        else
            res.status(501).send('user was not added')
    } catch (e) {
        res.status(500).send('err0r')
    }
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})