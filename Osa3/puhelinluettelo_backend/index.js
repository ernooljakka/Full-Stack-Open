const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "044-2312765"
  },
  {
    id: "2",
    name: "Jasmiina koski",
    number: "044-2312343"
  },
  {
    id: "3",
    name: "Pekka Pouta",
    number: "044-2312111"
  },
    {
    id: "4",
    name: "Rasmus Raisio",
    number: "044-2312987"
  },
]

const generateId = () => {
  const newId = Math.floor(Math.random() * 10000)
  return String(newId)
}

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {

    const timeNow = new Date()

    response.send(`Phonebook has info for ${persons.length} people<br/>${timeNow}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
    response.json(person)
    } else {
    response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Name or the number is missing from the request"
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
})

app.put('/api/persons/:id', (request, response) => {

  const body = request.body

  if (persons.some(p => p.name === body.name)) {

    const person = persons.find(p => p.name === body.name)

    person.number = body.number 

    return response.json(person);
  }
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})