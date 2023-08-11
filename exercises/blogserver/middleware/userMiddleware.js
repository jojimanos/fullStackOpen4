const jwt = require('jsonwebtoken')

const findTheUser = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        const decodedToken = jwt.verify(token, process.env.SECRET)
        const userName = decodedToken.username
        request.userName = userName
        request.token = token
        console.log(token, request.userName)
    }
    next()
} 