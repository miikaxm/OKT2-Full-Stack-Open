import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { use } from 'react'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Miika Valkonen',
    url: 'test',
    likes: 2
  }

  const user = {
    username: 'testuser'
  }

  render(<Blog blog={blog} user={user} />)

  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)

  expect(element).toBeDefined()
})
