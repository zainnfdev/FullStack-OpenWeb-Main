import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import NotificationContext from './NotificationContext'
import { useReducer } from 'react'

const messageReducer = (state,action) => {
  return action.payload
}

const visibilityReducer = (state,action) => {
  return action.payload
}

const App = () => {

  const [message,messageDispatch] = useReducer(messageReducer,'')
  const [visibility,visibilityDispatch] = useReducer(visibilityReducer,false)

  setTimeout(()=> visibilityDispatch({payload : false}),5000)

  return (

    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={[message,messageDispatch,visibility,visibilityDispatch]}>
          <Notification />
          <AnecdoteForm />
          <AnecdoteList /> 
      </NotificationContext.Provider>
    </div>
  )
}

export default App
