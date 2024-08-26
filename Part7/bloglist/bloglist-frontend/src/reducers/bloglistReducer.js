import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blog'

const bloglistSlice = createSlice({
  name : 'blogs',
  initialState : [],
  reducers : {
    setBloglistState(state,action) {
      return action.payload
    },
    appendBloglistState(state,action) {
      return state.concat(action.payload)
    },
    updateBloglistState(state,action) {
      return state.map(blogList => blogList.id !== action.payload.id ? blogList : action.payload)
    },
    removeBlogListState(state,action) {
      return state.filter(blogList => blogList !== action.payload.id)
    }
  }
})

export const { setBloglistState,appendBloglistState,updateBloglistState,removeBlogListState } = bloglistSlice.actions
export default bloglistSlice.reducer

export const initializeBlogList = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBloglistState(blogs))
  }
}

export const createBlogList = (blogList) => {
  return async (dispatch) => {
    const newBlogList = await blogService.createRecord(blogList)
    dispatch(appendBloglistState(newBlogList))
  }
}

export const deleteBlogList = (recordToDelete) => {
  return async (dispatch) => {
    await blogService.deleteRecord(recordToDelete)
    dispatch(removeBlogListState(recordToDelete))
  }
}

export const updateBlogList = (recordToUpdate) => {
  return async (dispatch) => {
    const updatedList = await blogService.updateRecord(recordToUpdate)
    dispatch(updateBloglistState(updatedList))
  }
}