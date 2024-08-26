import { useState,useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Display from './components/Display'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogList,createBlogList,deleteBlogList,updateBlogList } from './reducers/bloglistReducer'
import { removeUser,setLoggedUser } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [ listToShow,setListToShow ] = useState([])

  //Download all the availabale records during the initial render
  useEffect(() => {
    dispatch(initializeBlogList())
    dispatch(setLoggedUser())
  },[dispatch])

  //Need to refactor below function
  const handelLogout = async (event) => {
    event.preventDefault()
    dispatch(removeUser())
  }
  //Need to refactor below function
  const handleLike = (recordToUpdate) => {
    const updatedRecord = { ...recordToUpdate, user : recordToUpdate.user[0].id,likes : recordToUpdate.likes + 1 }
    try{
      dispatch(updateBlogList(updatedRecord))
    } catch (exception) {
      dispatch(setNotification('Could not update the record','red'))
    }
  }

  const handleCreateBlogList = async (newObject) => {
    try{
      const newListItem = { ...newObject, user: [{ 'id' : user.id, 'name' : user.name, 'username' : user.username }] }
      dispatch(createBlogList(newListItem))
      dispatch(setNotification(`a new blog '${ newObject.title }' added by ${ user.name }`,'green'))
    } catch(exception){
      dispatch(setNotification('Could not creat the record','red'))
    }
  }
  //Need to refactor below function
  const handleRemove = (recordToDelete) => {
    const confirmation = window.confirm(`Remove blog ${recordToDelete.title} by ${recordToDelete.author}`)
    if(confirmation){
      try {
        dispatch(deleteBlogList(recordToDelete))
        dispatch(setNotification(`' ${recordToDelete.title}' sucessfully removed`,'green'))
      } catch (exception) {
        dispatch(setNotification('Could not delete the record','red'))
      }
    }
  }

  //Need to refactor below function
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
          createNew={handleCreateBlogList}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user === null && <LoginForm /> }
        {user !== null && newBlogForm()}
        {user !== null && display()}
        {user !== null && <Display />}
      </div>
    </div>
  )
}

export default App