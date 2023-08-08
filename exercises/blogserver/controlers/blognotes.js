const blogNotesRouter = require('express').Router()
const Blog = require('../models/blognote')

blogNotesRouter.get('/blogs', async (request, response, next) => {
  const blogs = await Blog.find({}).catch(error => next(error))
  response.json(blogs)
})

blogNotesRouter.get('/blogs/:id', async (request, response, next) => {
const blogs = await Blog.findById(request.params.id)
.catch(error => next(error))
response.json(blogs)
})

blogNotesRouter.post('/blogs', async (request, response, next) => {
  const blog = await new Blog(request.body).save().catch(error => next(error))
  response.status(201).json(blog)
})

blogNotesRouter.delete('/blogs/:id', async (request, response, next) => {

  const blog = await Blog.findByIdAndDelete(request.params.id)
  .catch(error => next(error))
  response.json(blog)

})

blogNotesRouter.put('/blogs/:id', async (request, response, next) => {

  const body = request.body

  const blogUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blogUpdate, { new: true })
    .then(updatedBlog => response.json(updatedBlog))
    .catch(error => next(error))
})

module.exports = blogNotesRouter