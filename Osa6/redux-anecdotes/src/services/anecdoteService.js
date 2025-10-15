const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) throw new Error('Failed to fetch anecdotes');
  const data = await response.json();
  return data;
};

const create = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  });
  if (!response.ok) throw new Error('Failed to create anecdote');
  return await response.json();
};

const update = async (anecdote) => {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  });
  if (!response.ok) throw new Error('Failed to update anecdote');
  return await response.json();
};

export default { getAll, create, update };
