// Imports from react
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// component imports
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Blogform from "./components/Blogform";

// Services
import blogService from "./services/blogs";

// Reducers
import { setNotification } from "./reducers/notificationReducer";
import { appendBlog, blogLike, deleteBlog, initializeBlogs } from "./reducers/blogsReducer";
import { appendUser, loginUser } from "./reducers/userReducer";

const App = () => {
  // Dispatch and get user from redux state
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  // React states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  // Getting blogs from redux state and sorting them via likes
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => {

    return [...state.blogs]
      .sort((a, b) => b.likes - a.likes)
  })

  /* Login based */

  // Checks if loggedUser is found in localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(appendUser(user))
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  // Logs in, saves user in localstorage
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(loginUser({ username, password }))

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUsername("");
      setPassword("");
    } catch {
      dispatch(setNotification('Wrong password or username', 5)) 
    }
  };

  // sets current user to null and clears user from localstorage
  const handleLogOff = () => {
    dispatch(appendUser(null))
    localStorage.clear();
  };

  /* Create blog */

  // pushes new blog to bloglist and sets notification about this action
  const addBlog = (blogObject) => {
      dispatch(appendBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  };

  // Form for the blog creation
  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
    const showWhenVisible = { display: blogFormVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <Blogform createBlog={addBlog} />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  // Blog like
  const likedBlog = (blog) => {
    dispatch(blogLike(blog.id))
  };

  // Deletion of blog
  const remove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  };

  // If user is not found, Site just shows login form
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
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
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  // If user is found, shows the full page
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <h3>
        {user.username} logged in{" "}
        <button onClick={handleLogOff}>log off</button>{" "}
      </h3>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={likedBlog}
          user={user}
          remove={remove}
        />
      ))}
    </div>
  );
};

export default App;
