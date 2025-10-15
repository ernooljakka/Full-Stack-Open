import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

const initialState = ''

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find(a => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload);
    }
  }
});


export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
}

export const addNewAnecdote = (content) => async dispatch => {
  const newAnecdote = await anecdoteService.create(content)
  dispatch(addAnecdote(newAnecdote))
}

export const updateAnecdote = (anecdote) => async dispatch => {
  const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  await anecdoteService.update(updatedAnecdote)
  dispatch(voteAnecdote(anecdote.id))
}

