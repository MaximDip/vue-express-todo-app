const {Schema, model} = require('mongoose')

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  marked: {
    type: Boolean,
    required: true
  }
})

module.exports = model('Todo', TodoSchema)