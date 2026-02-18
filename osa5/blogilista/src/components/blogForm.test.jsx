import { render, screen } from '@testing-library/react'
import BlogForm from './Blogform'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputTitle = screen.getByPlaceholderText('write title here')
  const inputAuthor = screen.getByPlaceholderText('write author here')
  const inputUrl = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'testing a form title')
  await user.type(inputAuthor, 'testing a form author')
  await user.type(inputUrl, 'testing a form url')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)
  console.log(createBlog.mock.calls[0][0].title)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form url')
})