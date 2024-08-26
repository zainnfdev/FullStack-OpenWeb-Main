const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../model/user')

userRouter.post('/', async (request,response) => {
    const { username, name, password } = request.body

    if(!username || !password){
        return response.status(406).json({ error : 'username or password can not be empty'})
    }

    if(username.length < 3 || password.length < 3){
        return response.status(406).json({ error : 'username and password must contains at least 3 characters'})
    }
        const salRounds = 10
        const passwordHash = await bcrypt.hash(password,salRounds)
    
        const user = new User({
            username,
            name,
            passwordHash
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
})

userRouter.get('/', async (request,response) => {
    const users = await User.find({}).populate('blogs', { url : 1, title : 1, author : 1})
    response.json(users)
})

module.exports = userRouter