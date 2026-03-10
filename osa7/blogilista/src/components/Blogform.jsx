import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const Blogform = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Add new blog</Card.Title>

        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newTitle}
              placeholder="write title here"
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={newAuthor}
              placeholder="write author here"
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Url</Form.Label>
            <Form.Control
              type="text"
              value={newUrl}
              placeholder="write url here"
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>

        </Form>
      </Card.Body>
    </Card>
  );
};

export default Blogform;