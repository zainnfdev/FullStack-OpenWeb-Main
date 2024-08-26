import React from 'react'
import '@testing-library/jest-dom'
import { screen,render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleCreateNew = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createNew={handleCreateNew} />)

  const saveButton = screen.getByText('Create')

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')

  await user.type(title,'testing form functionality')
  await user.type(author,'Thiwanka Somachandra')
  await user.type(url,'https://www.test.org/forms')

  await user.click(saveButton)

  expect(handleCreateNew.mock.calls).toHaveLength(1)
  expect(handleCreateNew.mock.calls[0][0].title).toBe('testing form functionality')
  expect(handleCreateNew.mock.calls[0][0].author).toBe('Thiwanka Somachandra')
  expect(handleCreateNew.mock.calls[0][0].url).toBe('https://www.test.org/forms')
})