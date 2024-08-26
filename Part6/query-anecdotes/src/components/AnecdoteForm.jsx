import { useMutation,useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from '../request'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const messageDispatch = useContext(NotificationContext)[1]
  const visibilityDispatch = useContext(NotificationContext)[3]

  const newAnecdoteMutation = useMutation({
    mutationFn : createAnecdotes,
    onSuccess : () => {
      queryClient.invalidateQueries({queryKey: ['anecdote']})
    },
    onError : (error) => {
      messageDispatch({payload : error.response.data.error})
      visibilityDispatch({payload : true})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    try{
      newAnecdoteMutation.mutate({content,votes : 0})
      messageDispatch({payload : `anecdote '${content}' created`})
      visibilityDispatch({payload : true})
    } catch (error){
      console.log({error})
    }

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
