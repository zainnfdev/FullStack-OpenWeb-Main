const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS',30000)
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../model/blog')
const jwt = require('jsonwebtoken')
const User = require('../model/user')

const getToken = async () => {
  const user = {
    username: 'thiwankas',
    password: 'salainen',
  }
  const response = await api
        .post('/api/login')
        .send(user)
  return response.body.token;
};

const createBlog = async (blog, token) => {
  return api
        .post('/api/blogs')
        .set('Authorization',`Bearer ${token}`)
        .send(blog);
};

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Don’t Just LeetCode; Follow the Coding Patterns Instead",
    author: "Arslan Ahmad",
    url: "https://medium.com/gitconnected/dont-just-leetcode-follow-the-coding-patterns-instead-4beb6a197fdb",
    likes: 2
  }
]

describe('- creating blog list ',() => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await createBlog(blogs[0], await getToken())
    await createBlog(blogs[1], await getToken())
    await createBlog(blogs[2], await getToken())
  })
        
  test('return the correct amount of blog post resource in the JSON format', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
    await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type',/application\/json/)
  })

 test('verify the unique identifier property of the blog post resource is named id', async () => {
    const response = await api
          .get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
    
 test('should require a valid authorization token', async () => {
    const newBlogList = {
      title: "Ultimate Guide on How to Delete Commit History in Github",
      author: "Mehmood Ghaffar",
      url: "https://medium.com/@mgm06bm/ultimate-guide-on-how-to-delete-commit-history-in-github-35cc11d74571",
      likes: 4,
    }
    await api
          .post('/api/blogs')
          .send(newBlogList)
          .expect(401)
          .expect('Content-Type',/application\/json/)
    const response = await api
          .get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(blogs.length)
    expect(titles).not.toContain('Ultimate Guide on How to Delete Commit History in Github')
  })
    
  test('dafault value for the likes property is 0', async () => {
    const newBlogList = {
      title: "Ultimate Guide on How to Delete Commit History in Github",
      author: "Mehmood Ghaffar",
      url: "https://medium.com/@mgm06bm/ultimate-guide-on-how-to-delete-commit-history-in-github-35cc11d74571"
    }
    const token = await getToken()
    await api 
          .post('/api/blogs')
          .set('Authorization',`Bearer ${token}`)
          .send(newBlogList)
          .expect(201)
          .expect('Content-Type',/application\/json/)
    const response = await api.get('/api/blogs')
    const selectedRecord = response.body.find(r => r.title === newBlogList.title)
    expect(selectedRecord.likes).toBe(0)
  })  
    
  test('bad Request (400) - infromation missing for blog post resource', async () => {
    const newBlogList = {
      author: "Mehmood Ghaffar",
      likes : 5
    }
    const token = await getToken()
    await api 
        .post('/api/blogs')
        .set('Authorization',`Bearer ${token}`)
        .send(newBlogList)
        .expect(400)
  })

  test('should create a new blog post with valid data', async () => {
    const newBlogList = {
      title: "Is High Quality Software Worth the Cost?",
      author: "Martin Flower",
      url: "https://martinfowler.com/articles/is-quality-worth-cost.html",
      likes: 9,
    }
    const token = await getToken()
    const result = await api
        .post('/api/blogs')
        .set('Authorization',`Bearer ${token}`)
        .send(newBlogList)
        .expect(201)
        .expect('Content-Type',/application\/json/)
  })
})

describe('- updating blog list ',() => {

  test('should require a valid authorization token for updating a blog post', async () => {
    const listAtStart = await Blog.find({})
    const updatedRecord = {
      title: "React patterns",
      author: "Martin Luther King",
      url: "https://reactpatterns.com/",
      likes: 7
    }
    const selectedItem = listAtStart[0]
    const result = await api
        .put(`/api/blogs/${selectedItem.id}`)
        .expect(401)
        .expect('Content-Type',/application\/json/)
    const updatedList = await Blog.find({})
    expect(updatedList[0]).not.toEqual(updatedRecord)
  })

  test('should ensure the user has permission to update the blog post',async () => {
    const listAtStart = await Blog.find({})
    const updatedRecord = {
      title: "React patterns",
      author: "Martin Luther King",
      url: "https://reactpatterns.com/",
      likes: 7
    }
    const selectedItem = listAtStart[0]
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjU2MTY3NzIzNTQ0YTVjMTI5ZDc3NzgyIiwiaWF0IjoxNzAwOTk2NjExfQ.EMRpWVz0WwIPg-86Jhsmv1QhW9udJiZnzOOrL8zHc_o'
    const response = await api
        .put(`/api/blogs/${selectedItem.id}`)
        .set('Authorization',`Bearer ${token}`)
        .expect(403)
        .expect('Content-Type',/application\/json/)
    const updatedList = await Blog.find({})
    expect(updatedList[0]).not.toEqual(updatedRecord)
    expect(response.body.error).toBe('user doses not have access rights')
  })

  test('should update the blog post if the user has permission', async () => {
    const listAtStart = await Blog.find({})
    const updatedRecord = {
      title: "React patterns",
      author: "Martin Luther King",
      url: "https://reactpatterns.com/",
      likes: 7
    }
    const selectedItem = listAtStart[0]
    const token = await getToken()
    const response = await api
        .put(`/api/blogs/${selectedItem.id}`)
        .set('Authorization',`Bearer ${token}`)
        .send(updatedRecord)
        .expect(200)
        .expect('Content-Type',/application\/json/)
    expect(response.body.author).toBe(updatedRecord.author)
  })
})

describe('- deleting a blog list',() => {

  test('should require a valid authorization token for deletion ', async () => {
    const listAtStart = await Blog.find({})
    const selectedItem = listAtStart[0]
    const response = await api
        .delete(`/api/blogs/${selectedItem.id}`)
        .expect(401)
        .expect('Content-Type',/application\/json/)
    const listAtEnd = await Blog.find({})
    const contents = listAtEnd.map(r => r.title)
    expect(listAtEnd).toHaveLength(listAtStart.length)
    expect(contents).toContain(selectedItem.title)
    expect(response.body.error).toBe('jwt must be provided')
  })

  test('should ensure the user has permission to delete the blog post', async () => {
    const listAtStart = await Blog.find({})
    const selectedItem = listAtStart[0]
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjU2MTY3NzIzNTQ0YTVjMTI5ZDc3NzgyIiwiaWF0IjoxNzAwOTk2NjExfQ.EMRpWVz0WwIPg-86Jhsmv1QhW9udJiZnzOOrL8zHc_o'
    const response = await api
        .delete(`/api/blogs/${selectedItem.id}`)
        .set('Authorization',`Bearer ${token}`)
        .expect(403)
        .expect('Content-Type',/application\/json/)
    const listAtEnd = await Blog.find({})
    const contents = listAtEnd.map(r => r.title)
    expect(listAtEnd).toHaveLength(listAtStart.length)
    expect(contents).toContain(selectedItem.title)
    expect(response.body.error).toBe('user doses not have access rights')
  })

  test('should delete the blog post if the user has permission', async () => {
    const listAtStart = await Blog.find({})
    const selectedItem = listAtStart[0]
    const token = await getToken()
    await api
        .delete(`/api/blogs/${selectedItem.id}`)
        .set('Authorization',`Bearer ${token}`)
        .expect(204)
    const listAtEnd = await Blog.find({})
    const contents = listAtEnd.map(r => r.title)
    expect(listAtEnd).toHaveLength(listAtStart.length - 1)
    expect(contents).not.toContain(selectedItem.title)
  })
})

afterAll(async () => {
        await mongoose.connection.close()
})

