const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  for (let blog of helper.initialBlogs) {
    const user = await User.findOne({name: blog.author})
    blog.user = user.id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('A blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(titles).toContain('CyberCities')
})

test('A blog has the attribute id and not _id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

test('A blog is added to the database', async () => {
  const user = {username: 'AdamS', password: 'cybergonk'}
  const response = await api.post('/api/login').set('Content-Type', 'application/json').send(user)
  const token = response.body.token
  const decodedUser = jwt.decode(token)
  const initialLength = helper.initialBlogs.length
  const newBlog = {
    title: 'I smashed some goons',
    author: 'Adam Smasher',
    url: 'www.cybergoons.nc',
    likes: 1000,
    userId: decodedUser.id
  }
  await api.post('/api/blogs').set({'Content-Type':'application/json', 'Authorization': `bearer ${token}`}).send(newBlog)
  const finalBlogs = await helper.blogsInDb()
  expect(finalBlogs).toHaveLength(initialLength+1)
})

test('A like attribute of a blog is 0 if likes attribute is not given', async () => {
  const newBlog = new Blog({
    title: 'A new blog',
    author: 'Kaarle Testaaja',
    url: 'www.apitesterit.fi',
  })
  expect(newBlog.likes).toBe(0)
})

test('A request with a body without attributes title and url will reply with a status code 400', async () => {
  const user = {username: 'AdamS', password: 'cybergonk'}
  const login = await api.post('/api/login').set('Content-Type', 'application/json').send(user)
  const token = login.body.token
  const faultyBlog = {
    author: 'Kaarle HuonoKoodari',
  }
  const response = await api.post('/api/blogs').set({'Content-Type':'application/json', 'Authorization': `bearer ${token}`}).send(faultyBlog)
  expect(response.status).toBe(400)
})


test('A blog can be deleted', async () => {
  const user = {username: 'AdamS', password: 'cybergonk'}
  const response = await api.post('/api/login').set('Content-Type', 'application/json').send(user)
  const token = response.body.token
  const initialData = await helper.blogsInDb()
  const targetId = initialData[1].id
  const newResponse = await api.delete(`/api/blogs/${targetId}`).set('Authorization', `bearer ${token}`)
  const finalResponse = await helper.blogsInDb()
  expect(finalResponse).toHaveLength(initialData.length-1)
  expect(newResponse.status).toBe(204)
})

test('A blog can be updated', async () => {
  const user = {username: 'AdamS', password: 'cybergonk'}
  const response = await api.post('/api/login').set('Content-Type', 'application/json').send(user)
  const token = response.body.token
  const initialData = await helper.blogsInDb()
  const initialLikes = initialData[1].likes
  const targetId = initialData[1].id
  const newBlog = {...initialData[0], likes: initialLikes+1}
  const updatedBlog = await api.put(`/api/blogs/${targetId}`).set({'Content-Type':'application/json', 'Authorization': `bearer ${token}`}).send(newBlog)
  expect(updatedBlog.body.likes).toBe(initialLikes+1)

})


afterAll(() => {
  mongoose.connection.close()
})