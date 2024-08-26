const blogRouter = require('express').Router()
const Blog = require('../model/blog.js')
const User = require('../model/user.js')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async ( request,response) => {
    const blogs = await Blog.find({}).populate('user',{ username : 1, name : 1 })
    response.json(blogs)
})
  
blogRouter.post('/', async ( request,response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({ error : 'invalid token'})
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        url     : body.url,
        title   : body.title,
        author  : body.author,
        user    : user.id,
        likes   : body.likes
    })
    const savedList = await blog.save()
    user.blogs = user.blogs.concat(savedList._id)
    await user.save()
    response.status(201).json(savedList)
})

blogRouter.delete('/:id', async (request,response) => {
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({ error : 'jwt must be provided'})
    }
    const blog = await Blog.findById(request.params.id)
    if(!(blog.user.toString() === decodedToken.id.toString())){
        return response.status(403).json({ error : 'user doses not have access rights'})
    }
    await Blog.findOneAndDelete(blog)
    response.status(204).end()
})

blogRouter.put('/:id', async (request,response) => {
    const body = request.body
    const updatedRecord = {
        id      : body.id,
        url     : body.url,
        title   : body.title,
        author  : body.author,
        user    : body.user,
        likes   : body.likes
    }
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({ error : 'jwt must be provided'})
    }
    const blog = await Blog.findById(request.params.id)
    if(!(blog.user.toString() === decodedToken.id.toString())){
        return response.status(403).json({ error : 'user doses not have access rights'})
    }
    const result = await Blog.findByIdAndUpdate(request.params.id,updatedRecord, { new : true })
    response.status(200).json(result)
})

  module.exports = blogRouter