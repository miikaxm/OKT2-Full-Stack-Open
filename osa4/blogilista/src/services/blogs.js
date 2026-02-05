import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

// Kaikkien blogien hakeminen
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Uuden blogin luonti
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// Blogin päivitys id:n perusteella
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Blogin päivitys id:n perusteella
const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log(id)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }