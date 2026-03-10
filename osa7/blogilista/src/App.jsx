import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Blogform from "./components/Blogform";
import { setNotification } from "./reducers/notificationReducer";
import { appendBlog, blogLike, deleteBlog, initializeBlogs } from "./reducers/blogsReducer";
import { appendUser, loginUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  // React tilat
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  // Blogien läpi käynti näytölle
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => {

    return [...state.blogs]
      .sort((a, b) => b.likes - a.likes)
  })

  // Kirjautumiseen liittyvät
  // useEffect tarkistamaan löytyykö localstoragesta jo kirjautunut käyttäjä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(appendUser(user))
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  // Funktio kirjautumisen käsittelyyn
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

  // Funktio ulos kirjautumisen käsittelyyn
  const handleLogOff = () => {
    dispatch(appendUser(null))
    localStorage.clear();
  };

  // Blogin luontiin liittyvät
  // Funktio uuden blogin luonnille
  const addBlog = (blogObject) => {
      dispatch(appendBlog(blogObject))
      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  };

  // Blogin luonti formi
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

  // Blogin tykkäys
  const likedBlog = (blog) => {
    dispatch(blogLike(blog.id))
  };

  // Blogin poistaminen
  const remove = (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    dispatch(deleteBlog(blog.id))
  };

  // Jos käyttäjä ei ole kirjautunut näytetään vain kirjautumis lomake
  console.log("user state:", user)
  
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

  // Jos käyttäjä on kirjautunut näytetään koko sivu
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
