export const voteAnecdote = (id) => ({
  type: 'VOTE',
  payload: { id }
});

export const addAnecdote = (content) => ({
  type: 'NEW_ANECDOTE',
  payload: { content }
});

export const filterAnecdotes = (filter) => ({
  type: 'FILTER', 
  payload: {filter}
})