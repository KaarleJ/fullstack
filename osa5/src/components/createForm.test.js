import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from './createForm'
import userEvent from '@testing-library/user-event'

test('<CreateForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<CreateForm handleNew={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('title...')
  const inputAuthor = screen.getByPlaceholderText('author...')
  const inputUrl = screen.getByPlaceholderText('url...')
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'testblog')
  await user.type(inputAuthor, 'tester')
  await user.type(inputUrl, 'www.tests.nc')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testblog')
  expect(createBlog.mock.calls[0][0].author).toBe('tester')
  expect(createBlog.mock.calls[0][0].url).toBe('www.tests.nc')
})