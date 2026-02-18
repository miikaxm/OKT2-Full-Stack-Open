import axios from "axios"
const baseUrl = '/api/blogs'

const getAll = () => {
    console.log(`Fetching from: ${baseUrl}`); // Log the URL
    return axios.get(baseUrl);
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const DelPerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    DelPerson: DelPerson
}