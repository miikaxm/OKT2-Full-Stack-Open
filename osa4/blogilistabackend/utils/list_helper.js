const lodash = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, current) => {
    return current.likes > favorite.likes ? current : favorite
  })
}

const mostBlogs = (blogs) => {
  const grouped = lodash.groupBy(blogs, "author");

  const authorsWithCounts = lodash.map(grouped, (blogs, author) => ({
    author,
    blogs: blogs.length
  }));

  return lodash.maxBy(authorsWithCounts, "blogs");
};
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
