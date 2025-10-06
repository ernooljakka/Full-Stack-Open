const blogsRouter = require("express").Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    if (title === undefined || url === undefined) {
      return response.status(400).json({error: 'title or url missing'})
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes === undefined ? 0 : likes
    })

    const savedBlog = await blog.save()
    response.json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

    if (deletedBlog) {
      response.status(204).end()
    } else {
      response.status(404).json({ error: 'blog not found' })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {

  const body = request.body

  try {

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {likes: body.likes},
      {new: true, runValidators: true}
    )

    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).json({error: 'blog not found'})
    }

  } catch (error) {
    next(error)
  }

})

module.exports = blogsRouter 
