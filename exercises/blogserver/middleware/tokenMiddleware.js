const jwt = require('jsonwebtoken')

const getTokenFrom = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userName = decodedToken.username
        request.body.userName = userName
        request.token = token
        console.log(token, userName)
    }
    next()
}

module.exports = { getTokenFrom }