import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(response => {
        setBlogs(response.data)
      })
  }, [])
  console.log('render', blogs.length, 'blogs')

  return (
    <div>
      <h2>Blogilista</h2>
      <h3>Blogit</h3>

      <Blogs 
        blogs={blogs}
      />
    </div>
  )

}

export default App