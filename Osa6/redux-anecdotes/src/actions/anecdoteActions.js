export const voteAnecdote = (id) => ({
  type: 'VOTE',
  payload: { id }
});

export const addAnecdote = (content) => ({
  type: 'NEW_ANECDOTE',
  payload: { content }
});