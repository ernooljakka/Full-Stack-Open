const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//const url = `mongodb+srv://fullstack:${password}@cluster0.sormewm.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

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

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {

    const timeNow = new Date()

    Person.find({}).then(persons => {
      response.send(`Phonebook has info for ${persons.length} people<br/>${timeNow}`)
    })
})

app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id).then((person) => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      }
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Name or the number is missing from the request"
        })
    }

    if (body.name.length < 3) {
        return response.status(400).json({
          error: "The lenght of the name needs to be minimum of 3 letters"
        })
    }

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save().then(newPerson => {
      response.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', async (request, response, next) => {

  const body = request.body

  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      request.params.id,
      { number: body.number },
      { new: true, runValidators: true}
    )

    if (updatedPerson) {
      response.json(updatedPerson)
    } else {
      response.status(404).json({ error: 'Person not found' })
    }

  } catch (error) {
    next(error)
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: "Accepted number formats are xx-xxxx... or xxx-xxxx..." })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})