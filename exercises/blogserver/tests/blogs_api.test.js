const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const api = supertest(app)

//initialize the databases

const blogDb = mongoose.createConnection(process.env.TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userDb = mongoose.createConnection(process.env.TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const Blog = require('../models/blognote')
const User = require('../models/user')

const initialBlogs = [
    {
        author: "George",
        title: "Metaphysics",
        url: "url",
        likes: 10,

    },
    {
        author: "Christina",
        title: "Acting",
        url: "url",
        likes: 10
    }
]

const sarumansPass = "Iamsaruman"

const userForToken = {
    userName: "saruman",
    name: "theWhite",
}

const token = jwt.sign(userForToken, process.env.TEST_SECRET)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    const sarumansHash = await bcrypt.hash(sarumansPass, 10)

    const testUser = {
        userName: "saruman",
        name: "theWhite",
        hashpassword: sarumansHash
    }

    await User.deleteMany({})
    let userObject = new User(testUser)
    await userObject.save()

})

test('testing the api connection', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is in the blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    console.log(titles)
    expect(titles).toContain(
        'Metaphysics'
    )
})

test('a valid blog can be added', async () => {

    // const decodedUser = request.user
    // const user = jwt.verify(token, process.env.TEST_SECRET)
    const user = await User.findById(decodedUser.id)
    // request.token = token


    await api.post('/api/blogs', (request, response) => {
        request.token = token

        const newBlog = {
            author: "Rene",
            title: "Triad",
            url: "url",
            likes: 10,
            user: {
                userName: user.userName,
                name: user.name,
                id: user.id
            }
        }

    })
        .send(newBlog).expect(201).expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
})

test('id expected for all entries', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)

    expect(ids).toBeDefined()
})

test('likes default value is 0', async () => {
    const newBlog = {
        title: "Not liked Blog",
        author: "Not liked Author",
        url: "url",
    }

    await api.post('/api/blogs').send(newBlog)

    const response = await api.get('/api/blogs')

    const notLikedBlog = response.body.filter(r => r.title === newBlog.title)
    console.log(notLikedBlog[0].likes)

    expect(notLikedBlog[0].likes).toEqual(0)
})

test('status 400 if title or url missing', async () => {
    const newBlog = {
        author: "Someone",
        url: "url"
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.status).toBe(400)

})

test('blog deleted', async () => {
    const blogToDelete = {
        author: "George",
        title: "Metaphysics",
        url: "url",
        likes: 10,
        id: "idToDelete"
    }

    await api.delete('/api/blogs', (request, response) => {
        Blog.findByIdAndRemove(blogToDelete.id).expect(201)
    })

    const response = await api.get('/api/blogs')

    expect(response.body).not.toContain(blogToDelete)
})

test('successful update', async () => {
    const blogToUpdate = {
        author: "Christina",
        title: "Acting",
        url: "url",
        likes: 45,
    }

    const response = await api.get('/api/blogs')

    const id = response.body[1].id

    await api.put(`/api/blogs/${id}`).send(blogToUpdate)

    const updatedResponse = await api.get(`/api/blogs/${id}`)

    expect(updatedResponse.body.likes).toEqual(blogToUpdate.likes)
})

afterAll(async () => {
    await mongoose.connection.close()
})