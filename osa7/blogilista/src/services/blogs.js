import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

// Sets token
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

// Gets all blogs
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};


// Get blog by id
const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};


// Creates a new blog
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// Update blog by id
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// Remove blog by id
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  console.log(id);
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

// Add to blog by id
const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config);
  return response.data;
};

export default { getAll, create, setToken, update, remove, getById, addComment };
