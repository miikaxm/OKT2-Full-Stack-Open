require("dotenv").config()
const express = require("express")
const Person = require('./models/person')
const app = express()
app.use(express.static('dist'))
app.use(express.json())


// Morganin printti
const morgan = require("morgan")
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.get("/info", (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get("/api/persons/:id", (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(deletedPerson => {
            if (deletedPerson) {
                response.status(204).end()
            } else {
                response.status(404).json({ error: "Henkilöä ei löytynyt" })
            }
        })
        .catch(() => response.status(400).json({ error: "Virheellinen id" }))
})

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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})