const {Router} = require('express')
const router = Router();
const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: '123',
    port: 5432,
});

/*const _tasks = [
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
]*/

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});
//get tasks
router.get('/', async (req, res) => {
    try {
        const tasks = new Promise((resolve, reject) => pool.query('SELECT * FROM tasks',
            (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res.rows)
            }))
        if (tasks === {}) {
            res.status(200).send({body: tasks.rows})
        } else {
            res.status(200).send({body: _tasks})
        }
    } catch (e) {
        res.status(500).send('err0r')
    }
})

router.post('/create', async (req, res) => {
    try {
        const tasks = new Promise((resolve, reject) => pool.query('SELECT * FROM tasks'))
        res.status(200).send({body: tasks.rows})
    } catch (e) {
        res.status(500).send('err0r')
    }
})

module.exports = router