import { useQuery } from '@tanstack/react-query'
import anecdoteService from './services/anecdoteService'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from './contexts/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const { data: anecdotes = [], err } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'],
        anecdotes.map(a =>
          a.id === updatedAnecdote.id
          ? { ...a, votes: updatedAnecdote.votes }
          : a
        )
      )
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    voteAnecdoteMutation.mutate(votedAnecdote) 
    dispatch({ type: 'SHOW_NOTIFICATION', payload: `You voted "${anecdote.content}"` })

    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
  }
  
  if (err) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
