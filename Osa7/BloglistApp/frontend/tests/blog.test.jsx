import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

describe('Blog component', () => {
  it('renders the blog title', () => {
    const blog = {
      id: '1',
      title: 'React Testing',
      author: 'Tester',
      url: 'https://example.com/reacttest',
      likes: 42,
    }

    const handleLike = vi.fn()
    const handleDelete = vi.fn()

    render(
      <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
    )

    const titleElement = screen.getByText('React Testing')
    expect(titleElement).toBeDefined()
  })

  it('Renders all blog info when view is clicked', async () => {
    const blog = {
      id: '2',
      title: 'React Testing',
      author: 'Tester',
      url: 'https://example.com/reacttest',
      likes: 33,
    }

    const handleLike = vi.fn()
    const handleDelete = vi.fn()

    render(
      <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
    )

    expect(screen.getByText(blog.title)).toBeInTheDocument()
    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText(blog.author)).toBeNull()
    expect(screen.queryByText(blog.likes)).toBeNull()

    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    expect(screen.getByText(blog.url)).toBeInTheDocument()
    expect(screen.getByText(blog.author)).toBeInTheDocument()
    expect(screen.getByText(blog.likes.toString())).toBeInTheDocument()
  })

  it('calls the like handler twice if the like button is clicked twice', async () => {
    const blog = {
      id: '3',
      title: 'React Testing',
      author: 'Tester',
      url: 'https://example.com/reacttest',
      likes: 13,
    }

    const handleLike = vi.fn()
    const handleDelete = vi.fn()

    render(
      <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
    )

    const user = userEvent.setup()

    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(handleLike).toHaveBeenCalledTimes(2)
  })
})
