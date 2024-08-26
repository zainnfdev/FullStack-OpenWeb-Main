const User = require('../model/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error,request, response, next) => { 
    if(error.name === 'ValidationError'){ 
        return response.status(400).json({ error : error.message }) 
    } else if (error.name === 'JsonWebTokenError'){
        return response.status(401).json({ error : error.message }) 
    }
     next(error)
}

const tokenExtractor = (request,response,next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.substring(7)
    }
    next()
}

const userExtractor = async (request,response,next) => {
    const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if(decodedToken){
        request.user = await User.findById(decodedToken.id)
    }
}

module.exports = { tokenExtractor,errorHandler,userExtractor }