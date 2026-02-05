import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blogform from './components/Blogform'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])

  // useEffect kaikkien blogien hakuun sivulle
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sorted )
    })
  }, [])

  // useEffect tarkistamaan löytyykö localstoragesta jo kirjautunut käyttäjä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
 
  // Funktio kirjautumisen käsittelyyn
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
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    } catch {
      setErrorMessage(
        `wrong username or password`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  // Funktio ulos kirjautumisen käsittelyyn
  const handleLogOff = () => {
    setUser(null)
    localStorage.clear()
  }

  // Funktio uuden blogin luonnille
  const addBlog = (blogObject) => {
  blogService.create(blogObject).then(returnedBlog => {
    const blogWithUser = {
        ...returnedBlog,
        user: returnedBlog.user.username ? returnedBlog.user : {
        username: user.username,
        name: user.name,
        id: user.id
      }
    }

    setBlogs(prevBlogs => prevBlogs.concat(blogWithUser))
    setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => setErrorMessage(null), 5000)
  })
}

  // Blogin luonti formi
  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : ''}
    const showWhenVisible = { display: blogFormVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <Blogform
            createBlog={addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  // Blogin tykkäys
  const likedBlog = blog => {
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1
  }

  blogService
    .update(blog.id, changedBlog)
    .then(returnedBlog => {
      setBlogs(prevBlogs => prevBlogs.map(b => b.id !== blog.id ? b : returnedBlog))
    })
    .catch(() => {
      setErrorMessage(
        `Blog ${blog.title} was already removed from the server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id))
    })
  }

  // Blogin poistaminen
  const remove = blog => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    blogService
      .remove(blog.id)
      setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id))
  }


  
  // Jos käyttäjä ei ole kirjautunut näytetään vain kirjautumis lomake
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage}/>
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

  // Jos käyttäjä on kirjautunut näytetään koko sivu
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      <h3>{user.name} logged in <button onClick={handleLogOff}>log off</button> </h3>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} like={likedBlog} user={user} remove={remove} />
      )}
    </div>
  )
}

export default App