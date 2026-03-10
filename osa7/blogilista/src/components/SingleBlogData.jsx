import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import blogService from '../services/blogs'
import { commentBlog } from "../reducers/blogsReducer";

const SingleBlogData = ({ like, remove }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState("")

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

  const addComment = (e) => {
    e.preventDefault()
    if (!comment) return;

    dispatch(commentBlog(blog.id, comment));
    setComment("");
  }
  
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
      <form onSubmit={addComment}>
        <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
};

export default SingleBlogData;