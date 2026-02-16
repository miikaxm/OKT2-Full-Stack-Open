import { useState } from 'react'

const Blog = ({ blog, like, user, remove }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  // Tyylejä
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBtn = {
    backgroundColor: 'red',
    borderRadius: 5,
  }

  // Remove buttoni blogeihin jotka on luonut sisään kirjautunut käyttäjä
  if (user.username === blog.user?.username) {
    return (
      <div style={blogStyle} className="blog">
        <div style={hideWhenVisible}>
          {blog.title}
          <button onClick={() => setVisible(true)}>view</button>
        </div>

        <div style={showWhenVisible}>
          {blog.title}
          <button onClick={() => setVisible(false)}>hide</button>

          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => like(blog)}>like</button></div>
          <div>{blog.author}</div>
          <button style={removeBtn} onClick={() => remove(blog)}>remove</button>
        </div>
      </div>
    )
  }

  // Ilman remove buttonia olevat
  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title}
        <button onClick={() => setVisible(false)}>hide</button>

        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => like(blog)}>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}



export default Blog