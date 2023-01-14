const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  content: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
    delete returnedObject.password
  }
})

module.exports = mongoose.model('Comment', userSchema)