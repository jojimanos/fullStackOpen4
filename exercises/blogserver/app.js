const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogNotesRouter = require('./controlers/blognotes')
const usersRouter = require('./controlers/users')
const testingRouter = require('./controlers/testing')
const logger = require('./utils/logger')
const loginRouter = require('./controlers/login')
const tokenMiddleware = require('./middleware/tokenMiddleware')
const userMiddleware = require('./middleware/userMiddleware')

const mongoUrl = config.MONGODB_URI

console.log(mongoUrl)
mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.use(cors())
app.use(express.json())

app.use(tokenMiddleware.getTokenFrom)
app.use(userMiddleware.findTheUser)

app.use('/api', blogNotesRouter)
app.use('/api', usersRouter)
app.use('/api', loginRouter)

if (process.env.NODE_ENV === 'test') {  const testingRouter = require('./controlers/testing')  
app.use('/api/testing', testingRouter)}
// app.use(middleware.unknownEndpoint)

app.use(logger.errorHandler)

module.exports = app