import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../slices/anecdotesSlice'
import { setMessage, clearMessage } from '../slices/notificationSlice'

const AnecdoteFrom = () => {
  const dispatch = useDispatch()

  const [newAnecdote, setNewAnecdote] = useState('')

  const add = (e) => {
    e.preventDefault()
    console.log('Anecdote to be added:', newAnecdote);
    
    dispatch(addAnecdote(newAnecdote))
    dispatch(setMessage(`You Added '${newAnecdote}'` ))

    setNewAnecdote('')

    setTimeout(() => {
      dispatch(clearMessage())
    }, 5000)
  
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


