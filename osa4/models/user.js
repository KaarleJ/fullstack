const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: {type: String, minlength: 3},
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
    delete returnedObject.password
  }
})

module.exports = mongoose.model('User', userSchema)