import axios from "axios";
const baseUrl = "/api/users";

// Get all users
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Get user by id
const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getUserById };