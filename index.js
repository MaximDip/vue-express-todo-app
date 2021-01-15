const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./config')
const Todo = require('./models/Todo')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.get('/api/todos', async (_, res) => {
  try {
    const todos = await Todo.find({})
    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    })
  }
})

app.post('/api/todos', async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      text: req.body.text,
      marked: false
    })
    res.status(201).json({todo})
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    todo.marked = req.body.marked
    await todo.save()
    res.status(200).json({todo})
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    })
  }
})

app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json({message: 'Deleted'})
  } catch (err) {
    res.status(500).json({
      message: 'Server error'
    })
  }
})

async function start() {
  try {
    await mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    app.listen(config.PORT, () => {
      console.log('Server has been started on PORT:', PORT)
    })

  } catch (err) {
    console.log(err)
  }
}

start()