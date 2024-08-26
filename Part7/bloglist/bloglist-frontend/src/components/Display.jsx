import { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Blog from '../components/Blog'

const Display = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const listToShow = blogs.filter(item => item.user[0].username === user.username)
  const updateListToShow = (updatedRecord) => {
  }
  return (
    <div>
      <p>{user.username} logged in</p>
      <div>{listToShow.map(blog => <Blog blog={blog} key={blog.id}/>)}</div>
    </div>
  )
}

export default Display