import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdoteService'
import { useNotification } from '../contexts/NotificationContext'

const AnecdoteForm = () => {

  const { dispatch } = useNotification()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    
    if (content.length < 5) {
      dispatch({ type: 'SHOW_NOTIFICATION', payload: `Too short anecdote, minimum length is 5"${content}"` })

      setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
      return
    }

    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)

    dispatch({ type: 'SHOW_NOTIFICATION', payload: `You added "${content}"` })

    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
