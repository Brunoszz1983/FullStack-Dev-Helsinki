const express = require('express')
const morgan = require('morgan')

const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

morgan.token('postData', function (req) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use((req, res, next) => {
  if (req.method === 'POST') {
    return morgan(':method :url :status :res[content-length] - :response-time ms :postData')(req, res, next)
  }
  next()
})

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId+1)
}

app.post('/api/persons/', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({
      error: 'name content missing'
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number content missing'
    })
  }
  const nameExists = persons.find(person => person.name === body.name)

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

app.get('/info', (request,response) => {
    const dayTime = new Date().toString()
    const personNumber = persons.length
    response.send(`
        <p>Phonebook has info for ${personNumber} people</p>
        <p>${dayTime}</p>
        `)
})

app.get('/api/persons/:id',(request,response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request,response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})



const PORT = 3001
app.listen(PORT, () => {
    console.log (`Server running on port ${PORT}`)
})
