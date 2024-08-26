import { useQueryClient,useQuery,useMutation } from '@tanstack/react-query'
import { getAnecdotes,updateAnecdotes } from '../request'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteList = () => {

    const queryClient = useQueryClient()
    const [message,messageDispatch,visibility,visibilityDispatch] = useContext(NotificationContext)
  
    const updateAnecdoteMutation = useMutation({
      mutationFn : updateAnecdotes,
      onSuccess : () => {
        queryClient.invalidateQueries({queryKey: ['anecdote']})
      },
    })
  
    const handleVote = (anecdote) => {
      updateAnecdoteMutation.mutate({...anecdote, votes : anecdote.votes + 1})
      messageDispatch({payload : `anecdote '${anecdote.content}' voted`})
      visibilityDispatch({payload : true})
    }
  
    const result = useQuery({
      queryKey : ['anecdote'],
      queryFn : getAnecdotes
    })
  
    if(result.isLoading){
      return <div>Loading data...</div>
    }
  
    const anecdotes = result.data

    return(
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList