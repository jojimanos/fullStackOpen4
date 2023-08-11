const getTokenFrom = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
        request.token = token
        console.log(request)
    }
    next()
}

module.exports = { getTokenFrom }