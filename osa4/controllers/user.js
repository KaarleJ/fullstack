const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body
  
  if (!(username) || !(name) || !(password)) {
    return response.status(400).json({
      error: 'missing credential'
    })
  }

  if ((username.length<3) || (name.length<3) || (password.length<3)) {
    return response.status(400).json({
      error: 'credential lengths must be over 3 characters'
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    password: passwordHash,  
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, url: 1, likes: 1})
  response.json(users)
})

usersRouter.get('/info', async (request, response) => {
  const usersRaw = await User.find({})
  const users = usersRaw.map(({username, name, id}) => ({username, name, id}))
  response.json(users)
})

module.exports = usersRouter