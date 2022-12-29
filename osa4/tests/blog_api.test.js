const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Testblog',
    author: 'Kaarle Koodari',
    url: 'www.yle.fi',
    likes: 42069
  },
  {
    title: 'AutoJopo',
    author: 'Hullu Pyöräilijä',
    url: 'www.pyörät.fi',
    likes: 1
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('A blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(blog => blog.title)

  expect(titles).toContain('AutoJopo')
})

test('A blog has the attribute id and not _id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  expect(blog.id).toBeDefined()
})

test('A blog is added to the database', async () => {
  const initialLength = initialBlogs.length
  const newBlog = {
    title: 'A new blog',
    author: 'Kaarle Testaaja',
    url: 'www.apitesterit.fi',
    likes: 1000
  }
  await api.post('/api/blogs').set('Content-Type', 'application/json').send(newBlog)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialLength+1)
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
  const faultyBlog = {
    author: 'Kaarle HuonoKoodari',
  }
  const response = await api.post('/api/blogs').set('Content-Type', 'application/json').send(faultyBlog)
  expect(response.status).toBe(400)
})


test('A blog can be deleted', async () => {
  const response = await api.get('/api/blogs')
  const initialLength = response.body.length
  const targetId = response.body[0].id
  const newResponse = await api.delete(`/api/blogs/${targetId}`)
  const finalResponse = await api.get('/api/blogs')

  expect(finalResponse.body).toHaveLength(initialLength-1)
  expect(newResponse.status).toBe(204)
})

test('A blog can be updated', async () => {
  const initialLikes = initialBlogs[0].likes
  const initialData = await api.get('/api/blogs')
  const initialBlogId = initialData.body[0].id
  const newBlog = {...initialBlogs[0], likes: initialLikes+1}
  const updatedBlog = await api.put(`/api/blogs/${initialBlogId}`).set('Content-Type', 'application/json').send(newBlog)
  expect(updatedBlog.body.likes).toBe(initialLikes+1)

})


afterAll(() => {
  mongoose.connection.close()
})