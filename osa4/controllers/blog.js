const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})
  
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})
  
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(body.userId)
  
  if (!request.body.title && !request.body.url) {
    response.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})
  
blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = blog.user.toString()
  const claims = jwt.decode(request.token)

  console.log(claims.id, user)

  if (claims.id !== user) {
    return (
      response.status(401).json({
        error: 'Not authorized to delete specified resource'
      })
    )
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
  
blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = blog.user.toString()
  const claims = jwt.decode(request.token)
  const body = request.body

  if (claims.id !== user) {
    return (
      response.status(401).json({
        error: 'Not authorized to update specified resource'
      })
    )
  }
  
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
  response.json(updatedBlog)
})
  
module.exports = blogRouter