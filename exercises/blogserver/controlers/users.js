const usersRouter = require('express').Router() 
const User = require('../models/user') 
const bcrypt = require('bcrypt')

usersRouter.get('/users', async (request, response, next) => {
    const users = await User.find({}).catch(error => next(error))  
    response.json(users)
})

usersRouter.post('/users', async (request, response, next) => {
    
    const body = request.body

    const saltRounds = 10
    const passwordHash  = await bcrypt.hash(body.password, saltRounds).catch(error => console.error("Hashing error", error.message))

    const newUser = new User({
        userName: body.userName,
        name: body.name,
        hashpassword: passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter