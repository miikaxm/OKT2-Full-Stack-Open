import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

const Blog = ({ blog, like, user, remove }) => {

  // Styles
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  // Remove buttoni blogeihin jotka on luonut sisään kirjautunut käyttäjä
  if (user.username === blog.user?.username) {
    return (
      <div style={blogStyle} className="blog">
        <div>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      </div>
    );
  }

  // Ilman remove buttonia olevat
  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
    </div>
  );
};

export default Blog;
