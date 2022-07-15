const {Router} = require('express')
const { register, login, updateUser, deleteUser, getUser, getAllusers } = require('../Controllers/authControllers')
const {verifyToken, verifyUser, verifyAdmin} = require('../utils/verifyToken')

const router = Router()

// check authentication

// router.get('/checkuser/:id', verifyUser, (req,res,next) => {
//     res.send('Hello User you are logged in and authorized')
// })

// router.get('/checkauth', verifyToken, (req,res,next) => {
//     res.send('Hello User you are logged in and authorized')
// })

// router.get('/checkadmin/:id', verifyAdmin, (req,res,next) => {
//     res.send('Hello Admin you are logged in and authorized to access everything')
// })

// CREATE

router.post('/register', register)
router.post('/login', login)
// UPDATE

router.put('/edit/:id', verifyUser, updateUser)
// DELETE

router.delete('/delete', verifyUser, deleteUser)
// GET

router.get('/:id', verifyUser, getUser)
// GET ALL

router.get('/', verifyAdmin, getAllusers)

module.exports = router