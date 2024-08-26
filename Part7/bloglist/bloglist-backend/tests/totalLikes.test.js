const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const listWithZeroBlog = []
const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]

describe('total likes',() => {
    
    test('of empty list is zero',() => {
        const result = totalLikes(listWithZeroBlog)
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that',() => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right',() => {
        const result = totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog',() => {
    test('of empty list is an empty object',() => {
        const expectedResult = {}
        const result = favoriteBlog(listWithZeroBlog)
        expect(result).toEqual(expectedResult)
    })
    test('when list has only one blog, equals the same list item',() => {
        const expectedResult = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        const result = favoriteBlog(listWithOneBlog)
        expect(result).toEqual(expectedResult)
    })
    test('of a bigger list is retunred the correct list item',() => {
        const expectedResult = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        }
        const result = favoriteBlog(blogs)
        expect(result).toEqual(expectedResult)
    })
})

describe('most blogs',() => {
    test('of empty list, should retrun an empty object',() => {
        const expectedResult = {}
        const result = mostBlogs(listWithZeroBlog)
        expect(result).toEqual(expectedResult)
    })
    test('when list has only one blog, equals the same list item',() => {
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            blogs : 1
        }
        const result = mostBlogs(listWithOneBlog)
        expect(result).toEqual(expectedResult)
    })
    test('of a bigger list is retunred the correct list item',() => {
        const expectedResult = {
            author: "Robert C. Martin",
            blogs : 3
        }
        const result = mostBlogs(blogs)
        expect(result).toEqual(expectedResult)
  })
})

describe('most likes',() => {
    test('of empty list, should retrun an empty object',() => {
        const expectedResult = {}
        const result = mostLikes(listWithZeroBlog)
        expect(result).toEqual(expectedResult)
    })
    test('when list has only one blog, equals the same list item',() => {
      const expectedResult = {
            author : 'Edsger W. Dijkstra',
            likes : 5
      }
      const result = mostLikes(listWithOneBlog)
      expect(result).toEqual(expectedResult)
    })
    test('of a bigger list is retunred the correct list item',() => {
      const expectedResult = {
            author : 'Edsger W. Dijkstra',
            likes : 12
      }
      const result = mostLikes(blogs)
      expect(result).toEqual(expectedResult)
    })
})