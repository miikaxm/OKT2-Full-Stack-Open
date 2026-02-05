const blogRouter = require("express").Router()
const { response } = require("express")
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const { userExtractor } = require("../utils/middleware")

// get all
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// post new
blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

// delete
blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== user.id ) {
    return response.status(400).json({ error: 'only user who created blog can delete it' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// edit by id
blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

// get by id
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', { username: 1, name: 1 })

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(blog)
})




module.exports = blogRouter