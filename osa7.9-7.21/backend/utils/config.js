require('dotenv').config()

const PORT = process.env.PORT || 3003

const URL = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  URL,
  PORT
}
