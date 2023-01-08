import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', async () => {
  const blog = {
    title: 'Hello Nightcity',
    author: 'Johnny Silverhand',
    url: 'www.legends.nc',
    likes: 2077,
    user: { id: '1245112vv131c13c13v13v' }
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler}/>)

  const div = container.querySelector('.blog')
  const client = userEvent.setup()
  const likeButton = screen.getByText('like')
  await client.click(likeButton)
  screen.debug(div)
  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('blog component renders title, but not other info initially', async () => {
  const blog = {
    title: 'Hello Nightcity',
    author: 'Johnny Silverhand',
    url: 'www.legends.nc',
    likes: 2077,
    user: { id: '1245112vv131c13c13v13v' }
  }

  render(<Blog blog={blog}/>)
  const div = await screen.findAllByText('Hello Nightcity')
  expect(div[0]).toBeDefined()
  expect(div[0]).not.toHaveStyle('display: none')
  expect(div[1]).toHaveStyle('display: none')

})

test('blog component renders title, author, url and likes when show button is clicked', async () => {
  const blog = {
    title: 'Hello Nightcity',
    author: 'Johnny Silverhand',
    url: 'www.legends.nc',
    likes: 2077,
    user: { id: '1245112vv131c13c13v13v' }
  }

  render(<Blog blog={blog}/>)
  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)
  const div = await screen.findAllByText('Hello Nightcity')
  expect(div[0]).toBeDefined()
  expect(div[0]).toHaveStyle('display: none')
  expect(div[1]).not.toHaveStyle('display: none')

})

test('blog component calls the handleLike handler twice when the like button is clicked twice', async () => {
  const blog = {
    title: 'Hello Nightcity',
    author: 'Johnny Silverhand',
    url: 'www.legends.nc',
    likes: 2077,
    user: { id: '1245112vv131c13c13v13v' }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)
  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})