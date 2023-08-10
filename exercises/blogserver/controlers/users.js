const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/users', async (request, response, next) => {
    const users = await User.find({}).catch(error => next(error))
    response.json(users)
})

usersRouter.post('/users', async (request, response, next) => {

    const { userName, name, password } = request.body

    if (password.length < 3)
        return console.log('Password should be at least three characters long'),
            response.status(500).json("Password should be at least three characters long")
    if (password.length === 0)
        return console.log('Password is required to create a user'),
            response.status(500).json("Password is required to create a user")

    const saltRounds = 10
    const hashpassword = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        userName,
        name,
        hashpassword
    })

    const users = await User.find({ userName: userName })
    console.log(users)

    if (users.find(user => user.userName === userName))
        return response.status(500).json("Username already exists")

    try {
        const savedUser = await newUser.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }


})

module.exports = usersRouter