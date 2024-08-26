const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS',30000)
const User = require('../model/user')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./helper')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await User.deleteMany({})
    const defaultUser =  new User({
        username : "root",
        name : "Super User",
        passwordHash : await bcrypt.hash('salainen',10)
    })
    await defaultUser.save()
})

describe('testing user api',() => {
    test('users DB sucessfully initiated ', async () => {
        const result = await helper.usersInDb()
        const usernames = result.map(r => r.username)
        expect(usernames).toContain("root")
    })

    test('creation fails with proper status-code and message if username or password is missing', async() => {
        const user = {
            username :"",
            name : "Matti Luukkainen",
            password : "salainen"
        }
        const result = await api
                            .post('/api/users')
                            .send(user)
                            .expect(406)
        expect(result.body.error).toContain('username or password can not be empty')
    })

    test('creation fails with proper status-code and message if username or password is too-short', async() => {
        const newUser = {
            username : "mluukkainen",
            name : "Matti Luukkainen",
            password : "sa"
        }
        const result = await api
                            .post('/api/users')
                            .send(newUser)
                            .expect(406)
        expect(result.body.error).toContain('username and password must contains at least 3 characters')
    })

    test('creation fails with proper status-code and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const user = {
            username : "root",
            name : "Super User",
            password : "salainen"
        }
        const result = await api
                            .post('/api/users')
                            .send(user)
                            .expect(400)
        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation succeeds with complete details', async () => {
        const usersAtStart = await helper.usersInDb()
        const user = {
            username : "thiwankas",
            name : "Thiwanka Somachandra",
            password : "salainen"
        }
        const result = await api
                                .post('/api/users')
                                .send(user)
                                .expect(201)
                                .expect('Content-Type',/application\/json/)
        const usersAtEnd = await helper.usersInDb()
        const usernames = usersAtEnd.map(r => r.username)
        expect(usernames).toContain(user.username)
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    })
})

afterAll(async() => {
    await mongoose.connection.close()
})