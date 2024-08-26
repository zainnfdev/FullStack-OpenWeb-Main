require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./model/person')
const ErrorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//get all the rcords from the DB
app.get('/api/persons',(request, response, next) => {Person.find({}).then(record => { response.json(record) }).catch(error => { next(error) })})
//get the info
app.get('/info',(request,response, next) => {Person.find({}).then(records => { response.send(`<p>Phonebook has info for ${ records.length } people</p><p>${ new Date() }</p>`) }).catch(error => { next(error) }) })
//get one record by Id
app.get('/api/persons/:id',(request,response,next) => { Person.findById(request.params.id).then(record => { response.json(record) }).catch(error => { next(error) }) })
//delete a record from DB
app.delete('/api/persons/:id',(request,response,next) => { Person.findByIdAndRemove(request.params.id).then(result => { response.status(204).end() }).catch(error => { next(error) }) })
//save record to DB
app.post('/api/persons',(request,response,next) => { const body = request.body; if (!body.name) { return response.status(400).json({ error : 'name is missing' })} else if (!body.number) { return response.status(400).json({ error : 'number is missing' }) } else { const person = new Person({ name : body.name,number : body.number }); person.save().then(savedRecord => { response.json(savedRecord) }).catch(error => { next(error) })}})
//update a record
app.put('/api/persons/:id',(request, response, next) => { const body = request.body; Person.findByIdAndUpdate(request.params.id,{ number : body.number },{ new : true, runValidators : true, context : 'query' }).then(updatedRecord => { response.json(updatedRecord) }).catch(error => { next(error) }) })


app.use(ErrorHandler)
const PORT = process.env.PORT
app.listen(PORT,() => { console.log(`Server running on ${PORT}`); console.log('-------------------------')
})