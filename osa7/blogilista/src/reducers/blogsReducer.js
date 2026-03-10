import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],

  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },

    likeBlog(state, action) {
      const updated = action.payload;
      return state.map(b =>
        b.id === updated.id
          ? { ...updated, user: b.user }
          : b
      );
    },

    setBlogs(state, action) {
      return action.payload;
    },

    removeBlog(state, action) {
      return state.filter(b => b.id !== action.payload);
    },

    addCommentToBlog(state, action) {
      const updated = action.payload;
      return state.map(b => b.id === updated.id ? updated : b);
    }
  },
});

const { setBlogs, createBlog, likeBlog, removeBlog, addCommentToBlog} = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(createBlog(newBlog));
  };
};

export const blogLike = (id) => {
  return async (dispatch, getState) => {
    const { blogs } = getState();
    const blog = blogs.find(b => b.id === id);
    if (!blog) return;

    const toSend = { ...blog, likes: blog.likes + 1 };
    const updated = await blogService.update(blog.id, toSend);
    dispatch(likeBlog(updated));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, comment);
    dispatch(addCommentToBlog(updatedBlog));
  };
};

export default blogSlice.reducer;