import { useState } from 'react'
import { addAnecdote } from '../actions/anecdoteActions'
import { useDispatch } from 'react-redux'

const AnecdoteFrom = () => {
  const dispatch = useDispatch()

  const [newAnecdote, setNewAnecdote] = useState('')

  const add = (e) => {
    e.preventDefault()
    console.log('Anecdote to be added:', newAnecdote);
    
    dispatch(addAnecdote(newAnecdote))

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


