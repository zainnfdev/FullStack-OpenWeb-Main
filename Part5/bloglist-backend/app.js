const config = require('./utils/config')
const middleware = require('./utils/middleware')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controller/blog')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
//const ErrorHandler = require('./middleware/errorHandeler')
//const tokenExtractor = require('./middleware/tokenExtractor')


mongoose.set('strictQuery',false)

const mongoUrl = config.MONGO_URL

mongoose.connect(mongoUrl).then((result)=>{
    logger.info('Connection sucessful!')
  })

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(middleware.tokenExtractor)
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter,middleware.userExtractor)
app.use('/api/login',loginRouter)
if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controller/testing')
  app.use('/api/testing',testingRouter)
}
app.use(middleware.errorHandler)

module.exports = app