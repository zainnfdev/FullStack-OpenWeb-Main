import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlogList,updateBlogList } from '../reducers/bloglistReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const listToShow = blogs.filter(item => item.user[0].username === user.username)
  const [ visibility,setVisibility ] = useState(false)
  const [ buttonLable,setButtonLable ] = useState('Show')
  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    paddingBottom : 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonStyle ={
    backgroundColor : '#D1583E'
  }

  const showDetails = { display : visibility ? '' : 'none' }

  const toggaleVisibility = () => {
    setVisibility(!visibility)
    setButtonLable(visibility ? 'Show' : 'Hide')
  }

  const handleLike = (recordToUpdate) => {
    const updatedRecord = { ...recordToUpdate, user : recordToUpdate.user[0].id,likes : recordToUpdate.likes + 1 }
    try{
      dispatch(updateBlogList(updatedRecord))
    } catch (exception) {
      dispatch(setNotification('Could not update the record','red'))
    }
  }

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
  return (
    <div className='blogList' style={blogStyle}>
      <div className='titleDiv'>Titile : {blog.title} <button id='show-button' onClick={toggaleVisibility}>{buttonLable}</button></div>
      <div className='buttonDiv' style={showDetails}>
        <div>url : {blog.url}</div>
        <div id='like-element' >likes : {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>like</button></div>
        <div>Created by : {user.name} </div>
        <div><button id='delete-button' style={buttonStyle} onClick={() => handleRemove(blog)}>Remove</button></div>
      </div>
    </div>
  )
}

export default Blog