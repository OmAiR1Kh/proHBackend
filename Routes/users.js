const {Router} = require('express')
const { register } = require('../Controllers/authControllers')

const router = Router()

// CREATE

router.post('/create', register)
// UPDATE
// DELETE
// GET
// GET ALL

module.exports = router