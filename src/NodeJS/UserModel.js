const MD5 = require('crypto-js/MD5')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo',
    password: '123',
    port: 5432,
});

const getUser = ({id}) => {
    //let pass = MD5(password)
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * FROM users`, (error, results) => {
            if (error) {
                reject(error)
            }
            debugger
            resolve(results.rows);
            //console.log(results)
        })
    })
}
/*const createUser = (body) => {
    return new Promise(function (resolve, reject) {
        const {firstName, lastName, patronymic, login, password, salt} = body
        pool.query(
            'INSERT INTO merchants (firstName, lastName, patronymic, login, password, salt)' +
            ' VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstName, lastName, patronymic, login, password, salt],
            (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new user has been added added: ${results.rows[0]}`)
        })
    })
}
const deleteUser = () => {
    return new Promise(function (resolve, reject) {
        const id = parseInt(request.params.id)
        pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`User deleted with ID: ${id}`)
        })
    })
}*/

module.exports = {
    getUser,
    //createUser,
    //deleteUser,
}