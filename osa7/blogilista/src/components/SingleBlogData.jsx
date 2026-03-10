import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, Button, Form, ListGroup, Badge } from "react-bootstrap";
import { commentBlog } from "../reducers/blogsReducer";

const SingleBlogData = ({ like, remove }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const { id } = useParams();

  const currentUser = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);

  const blog = blogs.find(b => b.id === id);

  if (!blog) return <div>Loading blog...</div>;
  if (!blog.user) return <div>Loading blog user...</div>;

  const isOwner = blog.user?.username === currentUser?.username;

  const addComment = (e) => {
    e.preventDefault();
    if (!comment) return;

    dispatch(commentBlog(blog.id, comment));
    setComment("");
  };

  return (
    <Card>
      <Card.Body>

        <Card.Title>{blog.title}</Card.Title>

        <Card.Text>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </Card.Text>

        <Card.Text>
          <Badge bg="secondary" className="me-2">
            likes {blog.likes}
          </Badge>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => like(blog)}
          >
            like
          </Button>
        </Card.Text>

        <Card.Text>
          added by <strong>{blog.user.name}</strong>
        </Card.Text>

        {isOwner && (
          <Button
            variant="danger"
            size="sm"
            className="mb-3"
            onClick={() => remove(blog)}
          >
            remove
          </Button>
        )}

        <hr />

        <h4>Comments</h4>

        <Form onSubmit={addComment} className="mb-3">
          <Form.Group className="d-flex gap-2">
            <Form.Control
              type="text"
              value={comment}
              placeholder="write comment"
              onChange={(event) => setComment(event.target.value)}
            />
            <Button type="submit" variant="primary">
              add
            </Button>
          </Form.Group>
        </Form>

        <ListGroup>
          {blog.comments.map((comment, index) => (
            <ListGroup.Item key={index}>
              {comment}
            </ListGroup.Item>
          ))}
        </ListGroup>

      </Card.Body>
    </Card>
  );
};

export default SingleBlogData;