const User = require('../Models/users')
const register = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            photo: req.body.photo
        })

        await newUser.save()
        res.status(201).json({msg: "User has been created successfully", msg2: newUser})
    } catch (error) {
        next(error);
    }
}

module.exports = {register}