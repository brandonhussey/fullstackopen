/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { application } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)

describe('when there is initially some blogs saved', () => {
  test('correct number of blogs returned as JSON', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body)
      .toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('identifier property to be named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test('updating a single post', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    blogToUpdate = blogsBeforeUpdate[0]

    const updatedPost =
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 20,
      }


    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedPost.likes })
      .expect(200)

    const postAfterUpdate = response.body
    expect(postAfterUpdate.likes).toBe(updatedPost.likes)
  })
})

describe('viewing a specific blog', () => {
  test('successful fetch of blog by id', async () => {
    const blogs = await helper.blogsInDb()

    const blogToSearch = blogs[0]

    const result = await api
      .get(`/api/blogs/${blogToSearch.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const fetchedBlog = JSON.parse(JSON.stringify(blogToSearch))
    expect(result.body).toEqual(fetchedBlog)
  })

  test('invalid id, fetch fails', async () => {
    const invalidID = '84h38hf783h43h7'

    await api
      .get(`/api/blogs/${invalidID}`)
      .expect(400)
  })
})
describe('addition of a new blog', () => {
  test('create a new blog post', async () => {

    const newPost = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAfterPost.map(blog => blog.title)
    expect(contents).toContain(newPost.title)
  })

  test('post with missing likes property defaults to zero', async () => {
    const newPost = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    const response = await api
      .post('/api/blogs')
      .send(newPost)

    expect(response.body.likes).toBe(0)
  })

  test('title/url are missing, bad request', async () => {
    const newPost = {
      author: 'Edsger W. Dijkstra',
      likes: 70
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('delete a single post', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDelete[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('delete fails with invalid id', async () => {
    const invalidId = 'f7d87sgfdushg89sfh'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})