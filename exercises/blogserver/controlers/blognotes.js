const blogNotesRouter = require('express').Router()
const Blog = require('../models/blognote') 

blogNotesRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
      response.json(blogs)
})

blogNotesRouter.post('/blogs', async (request, response) => {
  const blog = await new Blog(request.body).save().catch(error => {
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message);
      response.status(400).json({error: error.message})
    }
  })
      response.status(201).json(blog)
})

module.exports = blogNotesRouter