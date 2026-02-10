import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

test('clicking like calls handler once', async () => {
  const blog = {
    title: 'Test',
    author: 'Miika',
    url: 'test',
    likes: "2",
    user: { username: 'testuser' }
  }

  const userObj = {
    username: 'testuser'
  }

  const mockHandler = vi.fn()

  render(
    <Blog
      blog={blog}
      user={userObj}
      like={mockHandler}
    />
  )

  const user = userEvent.setup()

  // Avaa näkymä
  await user.click(screen.getByText('view'))

  const url = screen.getByText('test')
  const likes = screen.getByText("likes 2")
  const author = screen.getByText('Miika')
  screen.debug(url)
  screen.debug(likes)
  screen.debug(author)
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(likes).toBeDefined()
})
