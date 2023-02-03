const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contact'))
app.use(cors())

morgan.token('contact', (req, res) => JSON.stringify(req.body))

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-40-532523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-2342345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6481945"
    },
]

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has ${persons.length} contacts.</p> ${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    let id = Math.floor(Math.random() * 1000)

    if (persons.find(person => person.id === id)) {
        id++
    }

    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'Incomplete contact'
        })
    } else if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }

    persons.push(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})