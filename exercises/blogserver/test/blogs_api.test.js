const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

//initialize the database

const Blog = require('../models/blognote')

const initialBlogs = [
    {
        author: "George",
        title: "Metaphysics",
        url: "url",
        likes: 10

    },
    {
        author: "Christina",
        title: "Acting",
        url: "url",
        likes: 10
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save() 
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})
// 
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
    const newBlog = {
        author: "Rene",
        title: "Triad",
        url: "url",
        likes: 10
    }

    await api.post('/api/blogs')
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

afterAll(async () => {
    await mongoose.connection.close()
})