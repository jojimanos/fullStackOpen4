const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogNotesRouter = require('./controlers/blognotes')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI

console.log(mongoUrl)
mongoose.connect(mongoUrl).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.use(cors())
app.use(express.json())

app.use('/api', blogNotesRouter)
app.use(logger.errorHandler)

module.exports = app