const {Router} = require('express')
const router = Router();
const pool = require('./db')

router.get('/login', async (req, res) => {
    try{

    }catch(e){
        res.status(500).send('err0r')
    }
})

module.exports = router