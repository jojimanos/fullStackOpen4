const blogNotesRouter = require('express').Router()
const Blog = require('../models/blognote')
const User = require('../models/user')

blogNotesRouter.get('/blogs', async (request, response, next) => {

  try {
    const blogs = await Blog.find({}).populate('user', { userName: 1, name: 1, userId: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogNotesRouter.get('/blogs/:id', async (request, response, next) => {
  const blogs = await Blog.findById(request.params.id)
    .catch(error => next(error))
  response.json(blogs)
})

blogNotesRouter.post('/blogs', async (request, response, next) => {
  const body = request.body

  let user

  if (body.userId) {
    user = await User.findById(body.userId)
  } else {
    const users = await User.find({})
    user = users[0]
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: {
      userName: user.userName,
      name: user.name,
      userId: user.id
    }
  })

  const blog = await newBlog.save().catch(error => next(error))

  user.blogs = user.blogs.concat({
    _id: blog._id, 
    author: blog.author, 
    title: blog.title,
    url: blog.url,
    likes: blog.likes
  })
  await user.save()

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