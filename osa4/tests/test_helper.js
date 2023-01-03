const User = require('../models/user')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Testblog',
    author: 'Kaarle Koodari',
    url: 'www.yle.fi',
    likes: 42069
  },
  {
    title: 'CyberCities',
    author: 'Adam Smasher',
    url: 'www.CyberGoons.nc',
    likes: 420
  }
]

const initialUsers = [
  {
    username: 'KaarleJ',
    name: 'Kaarle Koodari',
    password: 'salasana',
    blogs: [],
  },
  {
    username: 'Mr.V',
    name: 'Mister V',
    password: 'cyberpunk',
    blogs: [],
  },
  {
    username: 'DavidM',
    name: 'David Mercenary',
    password: 'edgerunner',
    blogs: [],
  },
  {
    username: 'AdamS',
    name: 'Adam Smasher',
    password: 'cybergonk',
    blogs: [],
  }
]

initialUsers.forEach(async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
})

const nonExistingId = async () => {
  const blog = new Blog({Title: 'TestiBlogi', author: 'Kaarle Testaaja', url: 'www.testit.fi', likes: 2,})
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}