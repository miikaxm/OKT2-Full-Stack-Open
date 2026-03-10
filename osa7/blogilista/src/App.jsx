// React router
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

// Imports from react
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// component imports
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Blogform from "./components/Blogform";
import Users from "./components/Users";
import User from './components/User';
import SingleBlogData from './components/SingleBlogData'

// Services
import blogService from "./services/blogs";

// Reducers
import { setNotification } from "./reducers/notificationReducer";
import { appendBlog, blogLike, deleteBlog, initializeBlogs } from "./reducers/blogsReducer";
import { appendUser, loginUser } from "./reducers/userReducer";
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';


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
          <button className='p-1 mb-3 mt-3' onClick={() => setBlogFormVisible(true)}>
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <Blogform createBlog={addBlog} />
          <button className='p-1 mb-3 mt-3' onClick={() => setBlogFormVisible(false)}>cancel</button>
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
      <div className='container'>
        <h2>Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
    </div>
    );
  }

  // If user is found, shows the full page
  return (
    <Router>
      {/* Normal stuff */}
      <div className='container'>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Blog app</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link className='linkStyle' to={'/blogs'}>blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link className='linkStyle' to={'/users'}>users</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        <Notification/>

         {/* Routes */}
        <Routes>
        <Route
          path="/users"
          element={
            <div>
              <Users />
            </div>
          }
          />
          
          <Route
            path='/users/:id'
            element={
              <div>
                <User/>  
              </div>
          }
          />

          <Route
            path='/blogs/:id'
            element={
              <div>
                <SingleBlogData like={likedBlog} remove={remove} />
              </div>
            }
          />

        <Route
          path="/blogs"
          element={
            <div>
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
          }
          />
          
          <Route
          path="/"
          element={
            <div>
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
          }
        />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
