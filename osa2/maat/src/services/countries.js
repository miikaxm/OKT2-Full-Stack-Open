import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    return axios.get(baseUrl)
}

const getByName = (name) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
}

const getWeatherByName = (name) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${api_key}&units=metric`)
}

export default {
    getAll : getAll,
    getByName : getByName,
    getWeatherByName: getWeatherByName
}