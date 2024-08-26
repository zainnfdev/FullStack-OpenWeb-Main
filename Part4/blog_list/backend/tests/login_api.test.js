const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS',30000)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../model/blog')
const jwt = require('jsonwebtoken')
const User = require('../model/user')

test('should return an error for invalid username or password', async () => {
    const invalidUser = {
        username : 'KaushalyaR',
        password : 'juststupid'
    }
    const response = await api
            .post('/api/login')
            .send(invalidUser)
            .expect(401)
            .expect('Content-Type',/application\/json/)
    expect(response.body.error).toContain('invalid username or password')
})

test('should return a valid token for a valid username and password', async () => {
    const validUser = {
        username : 'thiwankas',
        password : 'salainen'
    }
    const response = await api
            .post('/api/login')
            .send(validUser)
            .expect(200)
            .expect('Content-Type',/application\/json/)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('username')
    expect(response.body).toHaveProperty('name')
})

afterAll (async ()=> {
   await mongoose.connection.close()
}) 