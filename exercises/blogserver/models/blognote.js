const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({comment: String})

const blogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: String,
  url: {type: String, required: true},
  likes: {type: Number, default: 0},
  user: {
    userName: String,
    name: String,
    userId: String
  },
  comments: {
    type: [commentSchema],
    default: undefined
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)