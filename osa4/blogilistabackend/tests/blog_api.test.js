const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { initialBlogs } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('id is named id not _id', async () => {
  const blog = new Blog({ 
    title: "JS Patterns",
    author: "miika valkonen",
    url: "testi",
    likes: 1
  })

  const saved = await blog.save()
  const json = saved.toJSON()

  assert.ok(json.id)
  assert.strictEqual(json._id, undefined)
})

test('a blog can be added', async () => {
  const newBlog = { 
    title: "Testi mesti",
    author: "miika valkonen",
    url: "testi2",
    likes: 120
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('Testi mesti'))
})

test('if likes not given they will be set to zero', async () => {
  const blog = new Blog({ 
    title: "Tykkäys testi",
    author: "miika valkonen",
    url: "testi3",
  })

  const saved = await blog.save()
  const json = saved.toJSON()

  assert.ok(json.likes === 0)
})

test('if title or url not giving expect 400', async () => {
  const newBlog = { 
    author: "miika valkonen",
    url: "testi4",
    likes: 140
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map((b) => b.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })

describe('editing a blog', () => {
  test('blog can be updated with PUT', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedData = {
    title: 'Testi päivitys titleen',
    author: 'Updated author',
    url: 'http://updated.com',
    likes: 10
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

  assert.strictEqual(updatedBlog.title, updatedData.title)
  assert.strictEqual(updatedBlog.likes, updatedData.likes)
})


})



after(async () => {
  await mongoose.connection.close()
})