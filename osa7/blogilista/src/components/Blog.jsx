import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {

  return (
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center">

        <Card.Title className="mb-0">
          <Link to={`/blogs/${blog.id}`} style={{ textDecoration: "none" }}>
            {blog.title}
          </Link>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Blog;