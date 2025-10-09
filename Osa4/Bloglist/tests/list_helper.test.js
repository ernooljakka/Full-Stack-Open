const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [
    { title: "First blog", author: "Alice", url: "https://example.com/", likes: 5 },
    { title: "Second blog", author: "Bob", url: "https://example.com/", likes: 3 }
  ]

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  const listWithOneBlog = [
    { title: "First blog", author: "Alice", url: "https://example.com/", likes: 5 }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {

  const blogs = [
    { title: "First blog", author: "Alice", url: "https://example.com/", likes: 5 },
    { title: "Second blog", author: "Bob", url: "https://example.com/", likes: 14 },
    { title: "Third blog", author: "Sam", url: "https://example.com/", likes: 14 },
    { title: "Fourth blog", author: "Bob", url: "https://example.com/", likes: 3 },
  ]

  test('Returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expected = { title: "Second blog", author: "Bob", url: "https://example.com/", likes: 14 }
    assert.deepStrictEqual(result, expected);
  })

})

describe('Most Blogs by author', () => {


  const blogs = [
    { title: "First blog", author: "Alice", url: "https://example.com/", likes: 5 },
    { title: "Second blog", author: "Bob", url: "https://example.com/", likes: 14 },
    { title: "Third blog", author: "Sam", url: "https://example.com/", likes: 14 },
    { title: "Fourth blog", author: "Bob", url: "https://example.com/", likes: 3 },
  ]

  test('Returns author that has the most blogs', () => {

    const result = listHelper.mostBlogs(blogs)

    const expected = {author: "Bob", blogs: 2}

    assert.deepStrictEqual(result, expected);
  })

})

describe('Author with most likes', () => {


  const blogs = [
    { title: "First blog", author: "Alice", url: "https://example.com/", likes: 5 },
    { title: "Second blog", author: "Bob", url: "https://example.com/", likes: 14 },
    { title: "Third blog", author: "Sam", url: "https://example.com/", likes: 14 },
    { title: "Fourth blog", author: "Bob", url: "https://example.com/", likes: 3 },
  ]

  test('Returns author that has the most likes', () => {

    const result = listHelper.mostLikes(blogs)

    const expected = {author: "Bob", likes: 17}

    assert.deepStrictEqual(result, expected);
  })

})