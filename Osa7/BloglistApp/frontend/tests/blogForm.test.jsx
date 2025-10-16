import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from '../src/components/BlogForm'
import { vi } from 'vitest'

test('<BlogForm /> calls HandleAddBlog with correct data when a new blog is created', () => {
  let title = ''
  let author = ''
  let url = ''

  const handleTitleChange = (v) => (title = v)
  const handleAuthorChange = (v) => (author = v)
  const handleUrlChange = (v) => (url = v)

  const handleAddBlog = vi.fn((e) => e.preventDefault())

  render(
    <BlogForm
      title={title}
      author={author}
      url={url}
      HandleAddBlog={handleAddBlog}
      handleTitleChange={handleTitleChange}
      handleAuthorChange={handleAuthorChange}
      handleUrlChange={handleUrlChange}
    />
  )

  const titleInput = screen.getByLabelText(/Title/i)
  const authorInput = screen.getByLabelText(/Author/i)
  const urlInput = screen.getByLabelText(/Url/i)
  const createButton = screen.getByText(/^Create$/i)

  fireEvent.change(titleInput, { target: { value: 'New title' } })
  fireEvent.change(authorInput, { target: { value: 'Author' } })
  fireEvent.change(urlInput, { target: { value: 'https://example.com/blog' } })

  fireEvent.click(createButton)

  expect(handleAddBlog).toHaveBeenCalledTimes(1)

  expect(title).toBe('New title')
  expect(author).toBe('Author')
  expect(url).toBe('https://example.com/blog')
})
