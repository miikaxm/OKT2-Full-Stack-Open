import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleBlogData = ({ like, remove }) => {
  // Gets id from route
  const { id } = useParams();

  // Style for remove button
  const removeBtn = {
    backgroundColor: "red",
    borderRadius: 5,
  };

  // Get current user from redux store
  const currentUser = useSelector(state => state.user)
  
  // Get blogs from redux store
  const blogs = useSelector(state => state.blogs);

  // Find the single blog
  const blog = blogs.find(b => b.id === id);

  // Checks if everything is loaded
  if (!blog) return <div>Loading blog...</div>;
  if (!blog.user) return <div>Loading blog user...</div>;

  // Checks if current user is owner of the blog
  const isOwner = blog.user?.username === currentUser?.username;
  
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>likes {blog.likes} <button onClick={() => like(blog)}>like</button></p>
      <p>added by {blog.user.name}</p>
      {isOwner && (
        <button style={removeBtn} onClick={() => remove(blog)}>remove</button>
      )}
      <h2>comments</h2>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
};

export default SingleBlogData;