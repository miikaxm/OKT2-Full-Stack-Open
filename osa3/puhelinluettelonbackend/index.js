require("dotenv").config()
const express = require("express")
const Person = require('./models/person')
const app = express()
app.use(express.static('dist'))
app.use(express.json())

// Morgan print
const morgan = require("morgan")
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

// Info page
app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

// Get all persons
app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// Get person by id
app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

// Delete person by id
app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(deletedPerson => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// Create new person
app.post("/api/persons", (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: "number missing"
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

// Error handle for unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// Error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

// Port
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})