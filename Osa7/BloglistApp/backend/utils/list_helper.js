const _ = require('lodash');


const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
/*
  let favorite = blogs[0];

  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  }

  return favorite;*/
  
  return _.maxBy(blogs, 'likes') || null

};

const mostBlogs = (blogs) => {

  const blogCountByAuthor = _.countBy(blogs, 'author')

  const authorWithMostBlogs = _.maxBy(Object.entries(blogCountByAuthor), ([author, num]) => num)[0];

  return { author: authorWithMostBlogs, blogs: blogCountByAuthor[authorWithMostBlogs] };

}

const mostLikes = (blogs) => {

  const arrayOfBlogsByAuthor = _.groupBy(blogs, 'author')

  const authorLikes = Object.entries(arrayOfBlogsByAuthor).map(([author, blogs]) => ({
    author,
    totalLikes: _.sumBy(blogs, 'likes')
  }));

  const topAuthor = _.maxBy(authorLikes, 'totalLikes');

  const result = {author: topAuthor.author, likes: topAuthor.totalLikes}

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}