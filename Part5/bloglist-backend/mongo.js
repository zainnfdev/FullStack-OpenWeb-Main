const mongoose = require('mongoose')

const TEST_MONGO_URL = require('./utils/config').TEST_MONGO_URL

mongoose.set('strictQuery',false)
mongoose.connect(TEST_MONGO_URL)

const blogSchema = new mongoose.Schema({
    title : String,
    author : String,
    url : String,
    likes : Number
})

const Blog = mongoose.model('Blog',blogSchema)

const blog = new Blog({
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
})

blog.save().then((savedBlog) => {
    console.log('blog list saved')
    mongoose.connection.close()
})