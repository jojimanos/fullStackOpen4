const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/login', async (request, response, next) => {
    const {userName, password} = request.body

    const user = await User.findOne({userName})
    const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.hashpassword)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.userName,
        id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    response
    .status(200)
    .send({token, userName: user.userName, name: user.name})
})

module.exports = loginRouter