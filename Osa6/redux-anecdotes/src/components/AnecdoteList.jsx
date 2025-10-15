import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../slices/anecdotesSlice'
import { setMessage, clearMessage } from '../slices/notificationSlice'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const sortedByLikes = [...anecdotes].sort((a,b) => b.votes - a.votes)
  const sortedByFilter = sortedByLikes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(setMessage(`You voted '${content}'` ))
    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  }

  return (
    <div>
      {sortedByFilter.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList