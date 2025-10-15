import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../slices/anecdotesSlice'
import { setNotification } from '../slices/notificationSlice'

const AnecdoteFrom = () => {
  const dispatch = useDispatch()

  const [newAnecdote, setNewAnecdote] = useState('')

  const add = (e) => {
    e.preventDefault()
    console.log('Anecdote to be added:', newAnecdote);
    
    dispatch(addNewAnecdote(newAnecdote))
    dispatch(setNotification(`you added '${newAnecdote.content}'`, 5))

    setNewAnecdote('')
  }

  return (
    <div className="anecdote-form">
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input 
          value={newAnecdote}
          onChange={(e) => setNewAnecdote(e.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteFrom


