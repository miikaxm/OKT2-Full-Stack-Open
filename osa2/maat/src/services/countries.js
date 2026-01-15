import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
    return axios.get(baseUrl)
}

const getByName = (name) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
}

export default {
    getAll : getAll,
    getByName : getByName
}