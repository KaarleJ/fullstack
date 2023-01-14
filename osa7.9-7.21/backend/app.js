const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('connecting to mongoDB', config.URL)
mongoose.connect(config.URL).then(()=> {
  logger.info('connected to mongodb')
}).catch(error => {
  logger.info('error connecting to mongodb', error.message)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!<h1/>')
})

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app