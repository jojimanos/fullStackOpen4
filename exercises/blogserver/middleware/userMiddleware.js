const jwt = require('jsonwebtoken')

const findTheUser = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const user = decodedToken
        request.user = user
    }
    next()
}

module.exports = { findTheUser }