import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import userService from '../services/users'

const User = () => {
  const { id } = useParams()        // <-- get :id from route
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getUserById(id).then(response => {
      setUser(response)
    })
  }, [id])

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User