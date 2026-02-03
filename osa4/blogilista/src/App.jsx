import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
    }
  }

  const handleLogOff = () => {
    setUser(null)
    localStorage.clear()
  }

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
    })
  }

  const blogForm = () => {
    return(
      <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input
           type="text"
           value={newTitle}
           onChange={({ target }) => setNewTitle(target.value)}
           />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
           type="text"
           value={newAuthor}
           onChange={({ target }) => setNewAuthor(target.value)}
           />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
           type="text"
           value={newUrl}
           onChange={({ target }) => setNewUrl(target.value)}
           />
        </label>
      </div>
      <button type='submit'>create</button>
    </form>
    )
  }
  
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
               type="text"
               value={username}
               onChange={({ target }) => setUsername(target.value)} 
              />
            </label>
          </div>
            <div>
            <label>
              password
              <input
               type="password"
               value={password}
               onChange={({ target }) => setPassword(target.value)} 
              />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.name} logged in <button onClick={handleLogOff}>log off</button> </h3>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App