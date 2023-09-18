const blogNotesRouter = require('express').Router()
const Blog = require('../models/blognote')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
// const authorization = request.get('authorization')
// if (authorization && authorization.startsWith('Bearer ')) {
// return authorization.replace('Bearer ', '')
// }
// return null
// }

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

  // const decodedToken = jwt.verify(
    // getTokenFrom(request)
    // request.token
    // , process.env.SECRET)
  // if (!decodedToken.id) {
    // return response.status(401).json({ error: 'token invalid' })
  // }
  const decodedToken = request.user
  const user = await User.findById(decodedToken.id)


  // let user
  // 
  // if (body.userId) {
  // user = await User.findById(body.userId)
  // } else {
  // const users = await User.find({})
  // user = users[0]
  // }

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
  // const decodedToken = jwt.verify(
    // getTokenFrom(request)
    // request.token
    // , process.env.SECRET)
    const decodedToken = request.user
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)

  try {
    if (user.blogs.find(blog => blog.id === request.params.id)) {
      
      const blog = await Blog.findByIdAndDelete(request.params.id)
      user.blogs = user.blogs.filter(blog => {return blog.id !== request.params.id})

      console.log(user.blogs)
      await user.save()

      response.json(blog)
    }
  } catch (error) {
    next(error)
  }

})

blogNotesRouter.put('/blogs/:id', async (request, response, next) => {

  const body = request.body

  const decodedToken = request.user
  const user = await User.findById(decodedToken.id)

  const blogUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: {
      userName: user.userName,
      name: user.name,
      userId: user.id
    }
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, { new: true }).catch(error => next(error))

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

blogNotesRouter.put('/blogs/:id/comments', async (request, response, next) => {

  const body = request.body

  const decodedToken = request.user
  const user = await User.findById(decodedToken.id)

  const blogUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: {
      userName: user.userName,
      name: user.name,
      userId: user.id
    },
    comments: body.comments.concat({comment: body.comment}) 
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, { new: true }).catch(error => next(error))

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

module.exports = blogNotesRouter