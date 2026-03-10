import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Card, ListGroup, Spinner } from "react-bootstrap"
import userService from "../services/users"

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getUserById(id).then(response => {
      setUser(response)
    })
  }, [id])

  if (!user) {
    return (
      <Container className="mt-3">
        <Spinner animation="border" />
      </Container>
    )
  }

  return (
    <Container className="mt-3">
      <Card>
        <Card.Body>

          <Card.Title>{user.name}</Card.Title>

          <Card.Subtitle className="mb-3 text-muted">
            Added blogs
          </Card.Subtitle>

          <ListGroup>
            {user.blogs.map(blog => (
              <ListGroup.Item key={blog.id}>
                {blog.title}
              </ListGroup.Item>
            ))}
          </ListGroup>

        </Card.Body>
      </Card>
    </Container>
  )
}

export default User