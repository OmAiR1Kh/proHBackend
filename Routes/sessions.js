const {Router} = require('express')
const {createSession, updateSession, deleteSession, getSession, getAllSessions} = require('../Controllers/sessionControllers')
const { verifyUser, verifyAdmin, verifyDoctor} = require('../utils/verifyToken')

const router = Router()

// CREATE
router.post('/create/:docid', createSession)

// UPDATE
router.put('/update', verifyDoctor, updateSession)

// DELETE
router.delete('/:id/:docid', verifyDoctor, deleteSession)
// GET
router.get('/:id', getSession)

// GET ALL
router.get('/', verifyDoctor, getAllSessions)

module.exports = router