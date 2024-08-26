import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const anecdoteSlice = createSlice({
  name : 'anecdote',
  initialState : [],
  reducers : {
    updateAnecdote (state,action ) {
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload )
    },
    setAnecdote (state,action) {
      return action.payload
    },
    appendAnecdote (state,action) {
      state.push(action.payload)
    }
  }
})

export const { updateAnecdote,setAnecdote,appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    const anecdoteToUpdate = {
        content: anecdote.content,
        id: anecdote.id,
        votes: anecdote.votes
    }
    dispatch(appendAnecdote(anecdoteToUpdate))
    dispatch(setNotification(`you created ${anecdote.content}`,10))
  }
}

export const castVote = (anecdote) => {
  return async dispatch => {
    const updatedObj = { ...anecdote, votes : anecdote.votes + 1 }
    const newAnecdote = await anecdoteService.updateRecord(anecdote.id,updatedObj)
    dispatch(updateAnecdote(newAnecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`,10))
  }
} 

export default anecdoteSlice.reducer