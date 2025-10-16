const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'JS ja React perusteet',
    author: 'the koodaaja2',
    url: 'https://example.com/JS_React',
    likes: 22,
  },
  {
    title: 'Python perusteet',
    author: 'the koodaaja1',
    url: 'https://example.com/Python',
    likes: 11,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = {
    username: 'ernotestaa',
    name: 'Erno',
    password: 'password123',
  }

  await api.post('/api/users').send(newUser)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'ernotestaa', password: 'password123' })

  token = loginResponse.body.token

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('Checking the initial notes', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 2)
  })

  test('blogs have id field instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    //if multiple asserts used, shows the message for the one that fails
    blogs.forEach((blog) => {
      assert.ok(blog.id, 'Blog should have an id field')
      assert.strictEqual(
        blog._id,
        undefined,
        '_id should not exist in the response'
      )
    })
  })
})

describe('Adding a new note tests', () => {
  test('a valid blog can be added via POST', async () => {
    const newBlog = {
      title: 'Node.js testaus',
      author: 'the testaaja3',
      url: 'https://example.com/test',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body

    assert.strictEqual(
      blogs.length,
      initialBlogs.length + 1,
      'Blog count should increase by 1'
    )

    const titles = blogs.map((b) => b.title)
    assert.ok(
      titles.includes(newBlog.title),
      'New blog title should exist in DB'
    )
  })

  test('likes defaults to 0 if not provided', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Tester',
      url: 'https://example.com/no-likes',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0, 'likes should default to 0')
  })

  test('POST fails with 400 if title is missing', async () => {
    const newBlog = {
      author: 'Tester',
      url: 'https://example.com/no-title',
      likes: 9,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('POST fails with 400 if url is missing', async () => {
    const newBlog = {
      title: 'Blog without url',
      author: 'Tester',
      likes: 11,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting a blog', () => {
  test('deleting a blog with valid id succeeds with 204 and removes it from DB', async () => {
    const blogToDelete = {
      title: 'Blog to delete',
      author: 'Erno',
      url: 'http://example.com',
    }

    const blogResponse = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogToDelete)

    const blogsAtStart = await Blog.find({})

    const blogId = blogResponse.body.id

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(
      blogsAtEnd.length,
      blogsAtStart.length - 1,
      'Blog count should decrease by 1'
    )

    const titles = blogsAtEnd.map((b) => b.title)
    assert.ok(
      !titles.includes(blogToDelete.title),
      'Deleted blog should not exist in DB'
    )
  })
})

describe('Updating blogs likes by one', () => {
  test('updating likes of a blog works correctly', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = { likes: blogToUpdate.likes + 1 }

    const response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(updatedLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(
      response.body.likes,
      blogToUpdate.likes + 1,
      'Likes should be incremented'
    )

    const blogInDb = await Blog.findById(blogToUpdate._id)
    assert.strictEqual(
      blogInDb.likes,
      blogToUpdate.likes + 1,
      'Likes in DB should be updated'
    )
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
