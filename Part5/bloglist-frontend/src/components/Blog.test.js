import React from 'react'
import '@testing-library/jest-dom'
import { screen,render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id  : '65616f7ad94764f816223b3a',
  url : 'https://overreacted.io/what-are-the-react-team-principles/',
  title : 'What Are the React Team Principles ?',
  author : 'Dan Abramov',
  likes : 23
}

const user = {
  id : '655fa6fa1727b51bf820f05d',
  username : 'mluukkai',
  name : 'Matti Luukkalainen'
}

const handleClickLikeButton = jest.fn()
const handleClickRemoveButton = jest.fn()

describe('<Bolg />', () => {
  let container
  beforeEach(() => {
    container = render(<Blog
      key={blog.id}
      blog={blog}
      user={user}
      handleClickLikeButton={handleClickLikeButton}
      handleClickRemoveButton={handleClickRemoveButton}
    />).container
  })

  test('displaying a blog renders the blog title only',  () => {
    const titileElement = screen.getByText('Titile : What Are the React Team Principles ?')
    expect(titileElement).toBeDefined()
    const buttonDiv = container.querySelector('.buttonDiv')
    expect(buttonDiv).toHaveStyle('display : none')
  })
  test('button controlling the shown details once clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)
    const buttonDiv = container.querySelector('.buttonDiv')
    expect(buttonDiv).not.toHaveStyle('display : none')
  })
  test('if the like button is clicked twice, the event handler called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(handleClickLikeButton.mock.calls).toHaveLength(2)
  })
})

