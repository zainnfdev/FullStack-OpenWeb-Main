import { useState,useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blog'
import loginService from './services/login'


const App = () => {

  const defaultMessage = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const [ blogs,setBlogs] = useState([])
  const [ user,setUser]   = useState(null)
  const [ username,setUsername ] = useState('')
  const [ password,setPassword ] = useState('')
  const [ listToShow,setListToShow ] = useState([])
  const [ message,setMessage ] = useState(null)
  const [ messageStyle,setMessageStyle ] = useState(defaultMessage)

  //Download all the availabale records during the initial render
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedUserJSON){
      const loggedInUser = JSON.parse(loggedUserJSON)
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      const blogList = blogs.filter(record => record.user[0].username === loggedInUser.username)
      setListToShow(blogList)
    }
  },[blogs])

  const displayNotification = (color,message) => {
    const updatedStyle = { ...messageStyle,color: color ,borderColor: color }
    setMessageStyle(updatedStyle)
    setMessage(message)
    setTimeout(()=> {
      setMessage(null)
    },5000)
  }

  const handelLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username,password })
      setUser(loggedInUser)
      blogService.setToken(loggedInUser.token)
      const blogList = blogs.filter(record => record.user[0].username === loggedInUser.username)
      setListToShow(blogList)
      window.localStorage.setItem('loggedInUser',JSON.stringify(loggedInUser))
      setUsername('')
      setPassword('')
    } catch (exception) {
      const color = 'red'
      const message = 'wrong username or passwrod'
      displayNotification(color,message)
    }
  }

  const handelLogout = async (event) => {
    event.preventDefault()
    try{
      setUser(null)
      blogService.setToken(null)
      window.localStorage.removeItem('loggedInUser')
      setUsername('')
      setPassword('')
    } catch (exception) {
      const color = 'red'
      const message = 'Oops! something went wrong'
      displayNotification(color,message)
    }
  }



  const handleLike = (recordToUpdate) => {
    const updatedRecord = { ...recordToUpdate, user : recordToUpdate.user[0].id,likes : recordToUpdate.likes + 1 }
    updateBlogList(updatedRecord)
  }

  const updateBlogList = async (updatedRecord) => {
    try{
      const updatedListItem = await blogService.updateRecord(updatedRecord)
      const filteredList = listToShow.filter(record => record.id !== updatedListItem.id)
      setListToShow(filteredList.concat(updatedListItem))
    } catch (exception) {
      const color = 'red'
      const message = 'Could not update the record'
      displayNotification(color,message)
    }
  }

  const createBlogList = async (newObject) => {
    try{
      const newRecord = await blogService.createRecord(newObject)
      const newListItem = {
        id      : newRecord.id,
        url     : newRecord.url,
        title   : newRecord.title,
        author  : newRecord.author,
        user    : [{ 'id' : user.id, 'name' : user.name, 'username' : user.username }],
        likes   : newRecord.likes
      }
      setListToShow(listToShow.concat(newListItem))
      const color = 'green'
      const message = `a new blog '${ newObject.title }' added by ${ user.name }`
      displayNotification(color,message)
    } catch(exception){
      const color = 'red'
      const message = 'Could not creat the record'
      displayNotification(color,message)
    }
  }

  const handleRemove = (recordToDelete) => {
    const confirmation = window.confirm(`Remove blog ${recordToDelete.title} by ${recordToDelete.author}`)
    if(confirmation){
      deleteBlogList(recordToDelete)
    }
  }

  const deleteBlogList = async (recordToDelete) => {
    try {
      await blogService.deleteRecord(recordToDelete)
      const filteredList = listToShow.filter(record => record.id !== recordToDelete.id)
      setListToShow(filteredList)
    } catch (exception) {
      const color = 'red'
      const message = 'Could not delete the record'
      displayNotification(color,message)
    }
  }

  const loginForm = () => (
    <div>
      <LoginForm
        handelLogin={handelLogin}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
  )

  const display = () => {
    const sortByLikes = (a,b) => b.likes - a.likes
    return(
      <div>
        <h4>previous list</h4>
        <div>
          {listToShow.sort(sortByLikes).map(blog => <Blog
            key={blog.id}
            blog={blog}
            handleClickLikeButton={handleLike}
            handleClickRemoveButton={handleRemove}
            user={user}
          />)}
        </div>
      </div>
    )
  }

  const newBlogForm = () => (
    <div>
      <p>{user.name} logged in <button onClick={handelLogout}>Logout</button></p>
      <h4>Create new blog list</h4>
      <Togglable buttonLable='Create New'>
        <BlogForm
          createNew={createBlogList}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} messageStyle={messageStyle} />
      <div>
        {user === null && loginForm()}
        {user !== null && newBlogForm()}
        {user !== null && display()}
      </div>
    </div>
  )
}

export default App
